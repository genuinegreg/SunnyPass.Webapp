all: npm bower build

# install and update npm packages
npm: force
	npm update

bower: force
	bower update

build: force
	grunt

clean: force
	grunt clean

force:
	true

