const express=require('express');
const pool=require('../pool.js');
var router=express.Router();
router.get('/list',function(req,res){
	var obj=req.query;
	var pno=obj.pno;
	var size=obj.size;
	if(!pno) pno=1;
	if(!size) size=9;
	pno=parseInt(pno);
	size=parseInt(size);
	console.log(pno,size);
	var start=(pno-1)*size;
	pool.query('SELECT lid,price,title FROM xz_laptop LIMIT ?,?',[start,size],function(err,result){
		if(err) throw err;
		res.send(result);
	});
});

module.exports=router;



