// interface Person {
//   firstName: string;
//   lastName: string;
//   fullName: () => string;
// }

class Person {
  private firstName: string;
  private lastName: string;

  constructor(firstName: string, lastName: string) {
    this.firstName = this.formatName(firstName);
    this.lastName = this.formatName(lastName);
  }

  setFirstName(firstName: string) {
    this.firstName = this.formatName(firstName);
  }

  getFirstName() {
    return this.firstName;
  }

  formatName(name: string) {
    const lowercase = name.toLocaleLowerCase();
    const uppercaseFirstLetter = name.charAt(0).toLocaleUpperCase();
    return uppercaseFirstLetter + lowercase.slice(1);
  }

  fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

// const myself: Person = {
//   firstName: "Brijendra",
//   lastName: "Singh",
//   fullName: function () {
//     return `${this.firstName} ${this.lastName}`;
//   },
// };

const myself: Person = new Person("bRIJendra", "sInGH");
console.log(myself.fullName());

const obj: Person = new Person("brIJ", "sINgh");
// obj.firstName = "bRIJ";
obj.setFirstName("bRIjj2006");
console.log(obj.fullName());
