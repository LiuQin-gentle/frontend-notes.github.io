# Linux基础 | 青训营笔记

## 1. 计算机硬件

* 在一个完整的冯诺依曼计算机体系中，计算机主要由五大基本单元组成，分别是控制器，运算器，存储单元，输入单元和输出单元。
* 控制器：协调和指挥计算机中各个部件进行按需作业
* 运算器：算术与逻辑运算的处理
* 存储器：分为内存与外存
* 输入设备：鼠标、键盘
* 输出设备：显示器、音响

## 2. 计算机操作系统

* 操作系统用来管理和控制计算机系统中的硬件和软件资源，用于在用户与系统硬件之间传递信息
* 操作系统主要提供了两个方面的能力
  * 一是管理计算机资源，包括处理器管理、存储管理、设备管理、文件管理等
  * 另一个是提供各种用户接口，包括命令接口、图形用户接口、程序调用接口，实现外部程序与操作系统内核的交互

* 操作系统启动流程分为传统模式（基于BIOS的启动流程）与当前的主流模式（基于UEFI的启动流程）

## 3. Linux系统概览

* Linux内核 + 常用软件 = Linux发行版本

* 查看Linux系统内核版本

   使用`uname -a` 和`cat /proc/version`命令在虚拟机查看Linux内核版本，结果为5.11.0-40-generic

  ```C
  liuqin@liuqin-virtual-machine:~$ uname -a
  Linux liuqin-virtual-machine 5.11.0-43-generic #47~20.04.2-Ubuntu SMP Mon Dec 13 11:06:56 UTC 2021 x86_64 x86_64 x86_64 GNU/Linux
  liuqin@liuqin-virtual-machine:~$ cat /procersion
  Linux version 5.11.0-43-generic (buildd@lcy02-amd64-036) (gcc (Ubuntu 9.3.0-17ubuntu1~20.04) 9.3.0, GNU ld (GNU Binutils for Ubuntu) 2.34) #47~20.04.2-Ubuntu SMP Mon Dec 13 11:06:56 UTC 2021
  liuqin@liuqin-virtual-machine:~$ cat /etc/os-release
  NAME="Ubuntu"
  VERSION="20.04.3 LTS (Focal Fossa)"
  ID=ubuntu
  ID_LIKE=debian
  PRETTY_NAME="Ubuntu 20.04.3 LTS"
  VERSION_ID="20.04"
  HOME_URL="https://www.ubuntu.com/"
  SUPPORT_URL="https://help.ubuntu.com/"
  BUG_REPORT_URL="https://bugs.launchpad.net/ubuntu/"
  PRIVACY_POLICY_URL="https://www.ubuntu.com/legal/terms-and-policies/privacy-policy"
  VERSION_CODENAME=focal
  UBUNTU_CODENAME=focal
  ```

## 4. Linux系统结构

* 一般有4个主要部分：内核，shell，文件系统，应用程序
* 内核
  * 硬件与软件的中间层
  * 一个资源管理程序
  * 提供一组面向系统的命令

* 进程管理

  * 进程是正在执行的一个程序或命令

  * 进程有自己的地址空间，占用一定的系统资源

  * 一个CPU核同一时间只能运行一个进程

  * 进程由它的进程ID（PID）和它父进程的ID（PPID）唯一识别

    * ps -ef | grep nginx 查看启动的nginx进程
    * top -p 3924 查看某个进程
    * kill 3924
    * top 全部进程动态实时视图

    ```C
    liuqin@liuqin-virtual-machine:~$ ps -ef | grep nginx
    liuqin      4050    3924  0 17:25 pts/0    00:00:00 grep --color=auto nginx
    liuqin@liuqin-virtual-machine:~$ top -p 3924
    
    top - 17:26:35 up 11 min,  1 user,  load average: 0.58, 0.57, 0.38
    任务:   1 total,   0 running,   1 sleeping,   0 stopped,   0 zombie
    %Cpu(s):  1.0 us,  1.0 sy,  0.0 ni, 97.9 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
    MiB Mem :   1948.1 total,    247.5 free,    943.2 used,    757.4 buff/cache
    MiB Swap:    923.3 total,    684.4 free,    238.8 used.    856.0 avail Mem 
    
     进程号 USER      PR  NI    VIRT    RES    SHR    %CPU  %MEM     TIME+ COMMAND  
       3924 liuqin    20   0   19512   4968   3352 S   0.0   0.2   0:00.02 bash
    ```

