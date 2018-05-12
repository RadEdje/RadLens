

import leftPad from './leftpad';

const serNos = [6934, 23111, 23114, 1001, 211161];
const strSNos = serNos.map(sn => leftPad(sn, 8, '0'));
console.log(strSNos);

