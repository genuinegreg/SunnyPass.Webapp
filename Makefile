all: npm bower build

# install and update npm packages
npm: force
	npm install
	npm update

bower: force
	bower install
	bower update

build: force
	grunt

clean: force
	grunt clean

force:
	true

