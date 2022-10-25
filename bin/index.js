#!/usr/bin/env node

const os = require('os');

const program = require('commander');

program.version(require("../package.json").version).parse(process.argv)

const dealTime = (seconds = 0) => {
  let day = (seconds / (3600 * 24)) | 0;
  let hours = ((seconds - day * 3600) / 3600) | 0;
  let minutes = ((seconds - day * 3600 * 24 - hours * 3600) / 60) | 0;
  let second = seconds % 60;
  (day < 10) && (day = '0' + day);
  (hours < 10) && (hours = '0' + hours);
  (minutes < 10) && (minutes = '0' + minutes);
  (second < 10) && (second = '0' + second);
  return [day, hours, minutes, second].join(':');
};

const dealMem = (mem) => {
  let G = 0,
    M = 0,
    KB = 0;
  (mem > (1 << 30)) && (G = (mem / (1 << 30)).toFixed(2));
  (mem > (1 << 20)) && (mem < (1 << 30)) && (M = (mem / (1 << 20)).toFixed(2));
  (mem > (1 << 10)) && (mem > (1 << 20)) && (KB = (mem / (1 << 10)).toFixed(2));
  return G > 0 ? G + 'G' : M > 0 ? M + 'M' : KB > 0 ? KB + 'KB' : mem + 'B';
};

//cpu架构
const arch = os.arch();
console.log('cpu架构：' + arch);

//操作系统内核
const kernel = os.type();
console.log('操作系统内核：' + kernel);

//操作系统平台
const pf = os.platform();
console.log('平台：' + pf);

//系统开机时间
const uptime = os.uptime();
console.log('开机时间：' + dealTime(uptime));

//主机名
const hn = os.hostname();
console.log('主机名：' + hn);

//主目录
const dir = os.homedir();
console.log('主目录：' + dir);

//内存
const totalMem = os.totalmem();
const freeMem = os.freemem();
console.log('内存大小：' + dealMem(totalMem) + ' 空闲内存：' + dealMem(freeMem));

//cpu
const cpus = os.cpus();
console.log('\r\n*****cpu信息*******');
cpus.forEach((cpu, idx, arr) => {
  let times = cpu.times;
  console.log(`cpu${idx}：`);
  console.log(`型号：${cpu.model}`);
  console.log(`频率：${cpu.speed}MHz`);
  console.log(`使用率：${((1 - times.idle / (times.idle + times.user + times.nice + times.sys + times.irq)) * 100).toFixed(2)}%`);
});

//网卡
console.log('\r\n*****网卡信息*******');
const networksObj = os.networkInterfaces();
for (let nw in networksObj) {
  let objArr = networksObj[nw];
  console.log(`\r\n${nw}：`);
  objArr.forEach((obj, idx, arr) => {
    console.log(`地址：${obj.address}`);
    console.log(`掩码：${obj.netmask}`);
    console.log(`物理地址：${obj.mac}`);
    console.log(`协议族：${obj.family}`);
  });
}