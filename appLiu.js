// 存储localStorage 中的数据
var store={
	save(key,value){ //存储数据
		
		localStorage.setItem(key,JSON.stringify(value))
	},
	
	fetch(key){ //获取数据
		return	JSON.parse(localStorage.getItem(key)) || []
	}
	
}
// 取出所以的值
var list=store.fetch("yuandao-new-class");
// 过滤的三种情况 all  finished unfinished
var filter={
			all:function(list){
				return list;
			},
			finished:function(list){ //当hash是finished 时候那么返回 任务已经完成的数据 也就是 isChecked 为true
				return list.filter(function(item){
					return item.isChecked;
				})
				
			},
			unfinished:function(){
				return list.filter(function(item){
					return !item.isChecked;
				})
			}
 	}
////生成数据
//var list = [{
//		title: '吃饭打豆豆',
//		isChecked:false
//	},
//	{
//		title: '吃饭打豆豆',
//		isChecked:true
//	}
//]

var vm=new Vue({
	el: ".main",
	data:{
		list:list,
		todo:"",
		edtorTodos:"",
		beforeTitle:"",
		visibility:"all"
		
	},
	  	 	watch:{
// 		list:function(){  // 监控list这个属性 当这个属性对应的值发生改变的就会执行函数
// 			store.save("yuandao-new-class",this.list)
// 		}
// 		
		list:{
			handler:function(){
				store.save("yuandao-new-class",this.list)
			},
			deep:true
		}
 	},
 	computed:{  //计算属性
 		noCheckedLength:function(){
 			return this.list.filter(function(item){
 				return !item.isChecked
 			}).length
 		},
 		filteredList:function(){// 找到过滤函数，就返回过滤 后的数据，如果没有找到 就返回所以数据
 			return filter[this.visibility]? filter[this.visibility](list):list
 			
 		}
 		
 	},
	
  methods:{

  	 addTodo(ev){
//	 	if(ev.keyCode===13){
//	 		this.list.push({
//	 			title:ev.target.value
//	 			
//	 		})
//	 	}
//按键修饰符取代 enter
           	 		this.list.push({
           	 			//ev.target使用了document  性能低
//	 			title:ev.target.value
                  title:this.todo,
	 			isChecked:false
	 		})
           	 this.todo=""		
  	},
  	deleteTodo(todo){
  		var index=this.list.indexOf(todo);
//		console.log("index:"+index);
//		console.log("todo:"+todo);
  		this.list.splice(index,1);
  	},
  	edtorTodo(todo){
  		 			// 编辑任务的时候，记录一下编辑的任务的这条title，方便在取消编辑的时候重新给之前的title
 			this.beforeTitle=todo.title;
 			this.edtorTodos=todo;
  		
  	},
  	edtorTodoed(todo){ //编辑任务成功

 			this.edtorTodos=""
 		},
 		 		cancelTodo(todo){ //取消编辑任务
 			todo.title=this.beforeTitle;
 			this.beforeTitle="";
 			//让div显示出来，input 隐藏
 			this.edtorTodos="";
 		
 		}
 },
  directives:{
  	"focus":{
  		update(el,binding){
  			console.log(el)
  			console.log(binding)
  			if(binding.value){
  				el.focus();
  			}
  		}
  	}
  }
  
})
 //addEventListener  为元素绑定事件 他可以绑定自定义事件
 
 function watchHashchange(){
 	var hash=window.location.hash.slice(1);
 	if(hash==""){
 		hash="all"
 	}
 	
 	vm.visibility=hash;
 }
 
 watchHashchange();
  window.addEventListener("hashchange",watchHashchange)