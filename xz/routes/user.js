const express=require('express');
const pool=require('../pool.js');
var router=express.Router();

//1.用户注册
router.post('/reg',function(req,res){
	var obj=req.body;
	console.log(obj);
	if(!obj.uname){
		res.send({code:401,msg:'uname require'});
		return;
	}
	if(!obj.upwd){
		res.send({code:402,msg:'upwd require'});
		return;
	}
	if(!obj.phone){
		res.send({code:403,msg:'phone require'});
		return;
	}
	if(!obj.email){
		res.send({code:404,msg:'email require'});
		return;
	}
	pool.query('INSERT INTO xz_user SET ?',[obj],function(err,result){
		if(err) throw err;
		console.log(result);
		if(result.affectedRows>0){
		res.send({code:200,msg:'注册成功'})}
	});
	//res.send('注册成功');
});
router.post('/login',function(req,res){
	//2.1获取数据
	var obj=req.body;
	console.log(obj);
	//2.2验证数据是否为空
	if (!obj.uname){
		res.send({code:401,msg:'uname require'});
		return;
	}
	if(!obj.upwd){
		res.send({code:402,msg:'upwd require'});
		return;
	}
	//2.3执行 SQL
	pool.query('SELECT * FROM xz_user WHERE uname=? AND upwd=?',[obj.uname,obj.upwd],function(err,result){
		if(err) throw err;
        if(result.length>0){
			res.send({code:200,msg:'login suc'});
		}else {
			res.send({code:301,msg:'login err'});}
		//console.log(result);
	});
});
router.get('/detail',function(req,res){
	var obj=req.query;
	console.log(obj);
	if(!obj.uid){
		res.send({code:401,msg:'uid require'});
		return;
	}
	//检索用户
	pool.query('SELECT * FROM xz_user WHERE uid=?',[obj.uid],function(err,result){
		if(err) throw err;
		if(result.length>0){
			res.send(result[0]);
		}else{
			res.send({code:301,msg:'can not found'});
		};
	});
});
router.get('/update',function(req,res){
	//获取数据
	var obj=req.query;
	console.log(obj);
	//验证数据是否为空
	//遍历对象，获取每个值
	var i=400;
	for(var key in obj){
		i++;
		if( !obj[key] ){
			res.send({code:i,msg:key+'require'});
			return;
		}
	}
	pool.query('UPDATE xz_user SET ? WHERE uid=?',[obj,obj.uid],function(err,result){
		if(err) throw err;
		if (result.affectedRows>0){
			res.send({code:200,msg:'update suc'});
		}else{
			res.send({code:301,msg:'update err'});
		};
	});
});
router.get('/list',function(req,res){
	var obj=req.query;
	//console.log(obj);
	var pno=obj.pno;
	var size=obj.size;
	if(!pno) pno=1;
	if(!size) size=3;
	pno=parseInt(pno);
	size=parseInt(size);
	console.log(pno,size);
	var start=(pno-1)*size;
	pool.query('SELECT * FROM xz_user LIMIT ?,?',[start,size],function(err,result){
		if(err) throw err;
		res.send(result);
	});
});
router.get('/delete',function(req,res){
	var obj=req.query;
	if(!obj.uid){
		res.send({code:401,msg:'uid require'});
		return;
	}
    pool.query('DELETE FROM xz_user WHERE uid=?',[obj.uid],function(
		err,result){
		if(err) throw err;
		console.log(result);
		if (result.affectedRows>0){
			res.send({code:200,msg:'delete suc'});
		}else{
			res.send({code:301,msg:'delete err'});
		};
	});
});

module.exports=router;











