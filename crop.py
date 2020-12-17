

from PIL import Image

#img = Image.open("assets/AB.png")
img = Image.open("assets/PJ.png")


side_size = 160

w, h = img.size

name = 0
print(h)
print(w)
print(w/side_size)
print(h/side_size)


for y in range (int(h/side_size)):
    for x in range (int(w/side_size)):
        img_copy = img.crop((x*side_size, (y*side_size), side_size+(x*side_size), side_size+(y*side_size)))
        #img_copy.save('assets/about_me/%s.png'%name)
        img_copy.save('assets/projects/%s.png'%name)
        name += 1
