cd package/packager
echo COMPILING
rbxtsc --verbose
rm rbxts-dl-modfile-packager-*.tgz
npm pack
cd ../../
npm i package/packager/rbxts-dl-modfile-packager-*.tgz
npx rbxtsc --verbose

rojo serve serve.project.json