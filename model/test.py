import struct
from struct import unpack
import numpy as np
from PIL import Image
from transformers import AutoImageProcessor, ResNetForImageClassification
import torch
import numpy as np

def unpack_drawing(file_handle):
    key_id, = unpack('Q', file_handle.read(8))
    country_code, = unpack('2s', file_handle.read(2))
    recognized, = unpack('b', file_handle.read(1))
    timestamp, = unpack('I', file_handle.read(4))
    n_strokes, = unpack('H', file_handle.read(2))
    image = []
    for i in range(n_strokes):
        n_points, = unpack('H', file_handle.read(2))
        fmt = str(n_points) + 'B'
        x = unpack(fmt, file_handle.read(n_points))
        y = unpack(fmt, file_handle.read(n_points))
        image.append((x, y))

    return {
        'key_id': key_id,
        'country_code': country_code,
        'recognized': recognized,
        'timestamp': timestamp,
        'image': image
    }


def unpack_drawings(filename):
    with open(filename, 'rb') as f:
        while True:
            try:
                yield unpack_drawing(f)
            except struct.error:
                break

def flatten_strokes(image):
    flattened_x = [point for stroke in image for point in stroke[0]]
    flattened_y = [point for stroke in image for point in stroke[1]]
    return flattened_x, flattened_y

drawings = []

for drawing in unpack_drawings('full_binary_airplane.bin'):
    # 각 그림을 개별적으로 처리
    flattened_x, flattened_y = flatten_strokes(drawing['image'])

    # Ensure that flattened_x and flattened_y have the same length
    min_len = min(len(flattened_x), len(flattened_y))
    flattened_x = flattened_x[:min_len]
    flattened_y = flattened_y[:min_len]

    # flattened_x 및 flattened_y에 대한 NumPy 배열 생성 (데이터를 정수로 변환)
    x = np.array(flattened_x, dtype=int)
    y = np.array(flattened_y, dtype=int)

    # x 및 y 배열을 단일 배열로 결합
    points = np.column_stack((x, y))

    # 각 그림에 대해 PIL 이미지 생성
    img = Image.fromarray(points.astype('uint8'))  # 데이터를 부호 없는 8비트 정수로 변환
    drawings.append({
        'key_id': drawing['key_id'],
        'country_code': drawing['country_code'],
        'recognized': drawing['recognized'],
        'timestamp': drawing['timestamp'],
        'image': img
    })

#-------------------------------------model

processor = AutoImageProcessor.from_pretrained("microsoft/resnet-50")
model = ResNetForImageClassification.from_pretrained("microsoft/resnet-50")

# Assuming drawings[0]['image'] is a PIL image
pil_image = drawings[2]['image']

# Convert the PIL image to a NumPy array
image_array = np.array(pil_image)

# Convert a grayscale image to three channels
if len(image_array.shape) == 2:
    image_array = np.stack([image_array] * 3, axis=-1)

# Add an extra batch dimension
image_array = np.expand_dims(image_array, axis=0)

# Convert the NumPy array back to a PIL image
image_with_batch_dim = Image.fromarray(image_array[0])

# Process the image
inputs = processor(images=image_with_batch_dim, return_tensors="pt")

with torch.no_grad():
    logits = model(**inputs).logits

# Model predicts one of the 1000 ImageNet classes
predicted_label = logits.argmax(-1).item()
#print(model.config.id2label[predicted_label])

result = model.config.id2label[predicted_label]