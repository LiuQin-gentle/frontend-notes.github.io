class Person{
    protected name: string
    private sex: string
    public constructor(name: string){
        this.name = name
        this.sex = 'male'
    }
}
class Student extends Person{
    study(){
        console.log(this.name)
        /* console.log(this.sex) */////Property 'sex' is private and only accessible within class 'Person ' .
    }
}

let person = new Person("daming")
/* person.name//Property 'name' is protected and only accessible within class'Person' and its subclasses.
person.sex */