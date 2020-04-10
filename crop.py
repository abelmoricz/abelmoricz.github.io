

from PIL import Image

img = Image.open("about.png")
side_size = 40

w, h = img.size

name = 0

new_img = img.crop((0,50,50,100))
new_img.save('assets/test.png')
print(w/side_size)
print(h/side_size)


for y in range (int(h/side_size)):
    for x in range (int(w/side_size)):
        img_copy = img.crop((x*side_size, (y*side_size), side_size+(x*side_size), side_size+(y*side_size)))
        img_copy.save('assets/%s.png'%name)
        name += 1

