function Person(name, age, sex) {
	this.name = name;
	this.age = age;
	this.sex = sex;
}
Person.prototype.showName = function() {
	alert(this.name);
};