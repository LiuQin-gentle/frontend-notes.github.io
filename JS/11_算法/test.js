//前面四行都是一样的
//牛客网：readline
//赛码：read_line
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

// 反转链表
var reverseList = function (head) {
  let cur = head;
  let pre = null;

  while (cur != null) {
    let temp = cur.next;
    cur.next = pre;
    pre = cur;
    cur = temp;
  }

  return pre;
};

// 重排链表
var reorderList = function (head) {
  // 用数组来存结点

  let arr = [];

  let cur = head;
  while (cur != null) {
    arr.push(cur);
    cur = cur.next;
  }
  // 双指针进行遍历
  let left = 1;
  let right = arr.length - 1;
  cur = head;
  cnt = 0;
  while (left <= right) {
    if (cnt % 2 == 0) {
      cur.next = arr[right];
      right--;
    } else {
      cur.next = arr[left];
      left++;
    }
    cur = cur.next;
    cnt++;
  }
  cur.next = null;
};

var __readline = require("readline-sync");
__readline.setDefaultOptions({ prompt: "" });
var readline = __readline.prompt;

let line = "";
let arr = [];

console.log("请输入链表长度：");
let n = parseInt(readline());
console.log("请输入链表：");
line = readline();
let lines = line.split(" ").map(Number);

for (let i = 0; i < n; i++) {
  arr.push(lines[i]);
}
console.log(" ");
console.log("初始链表为：");
console.log(arr);

// 把输入的数据存储成链表
// dummyHead：虚拟头结点
let dummyHead = new ListNode();
let p = dummyHead;
for (let i = 0; i < n; i++) {
  p.next = new ListNode(arr[i]);
  p = p.next;
}
// 反转链表
let cur = reverseList(dummyHead.next);
// 重排链表
// reorderList(dummyHead.next);
// 输出
let res = [];

while (cur != null) {
  res.push(cur.val);
  cur = cur.next;
}
console.log(" ");
console.log("反转后的链表为：");
console.log(res);
