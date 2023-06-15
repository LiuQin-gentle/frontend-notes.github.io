interface Person1{
    name: string;
    age: number
}

type Student1 = Person1 & {grade: number}
const stu: Student1
stu.age = 18
