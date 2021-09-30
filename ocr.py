from PIL import Image
from pytesseract import *
import sys

image = sys.argv[1]

im = Image.open(image)

text = pytesseract.image_to_string(im, lang = 'eng')

print(text)
sys.stdout.flush()
