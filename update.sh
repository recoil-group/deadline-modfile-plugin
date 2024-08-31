cd package/deadline-modfile-packager
echo COMPILING
rbxtsc --verbose
npm pack
cd ../../
npm i package/deadline-modfile-packager/rbxts-dl-modfile-packager-*.tgz
npx rbxtsc --verbose
rojo build --output plugin.rbxm