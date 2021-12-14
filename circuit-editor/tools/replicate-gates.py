import os
from os import listdir
from os.path import isfile, join
mypath = "."
onlyfiles = [f for f in listdir(mypath) if isfile(join(mypath, f))]
for afile in onlyfiles:
  if '.svg' in afile and ('ctrl-st-' in afile or 'ctrl-s-' in afile):
    if ('-up' in afile) or ('-down' in afile) or ('-mid' in afile):
      newfile = afile.replace('-st-', '-aggregate-')
    else:
      newfile = afile.replace('-s-', '-aggregate-')
    #print(afile, newfile)
    os.system("cp ./%s ./%s" % (afile, newfile))
