class Send {
	constructor(selector) {
		// 找到点击弹框按钮
		// 传参或者直接查找根据实际情况决定
	    this.btn = document.querySelector(selector);
		this.container = document.querySelector("#container");
		this.json = null; // 用json记录发送的微博
		this.bindEvents();
	}
	
	bindEvents() {
		// 给登录弹框按钮绑定事件
		this.btn.onclick = () => {
			// console.log(this);
			// 给container插入内容
			this.container.innerHTML = '<h4>发布微博</h4>'+
			'<a class="xBtn" href="javascript:;">×</a>'+
			'<p>用户名：<input type="text"></p>'+
			'<p>内容：</p><input type="textarea">'+
			'<button class="sendBtn" type="button">确认</button>';
			// 让container显示并且居中
			tools.showCenter(this.container);
			// 创建模态层
			this.motai = document.createElement("div");
			this.motai.className = "motai";
			document.body.appendChild(this.motai);
			
			this.init(this.container, "h4");
		}
		
		// 给删除按钮绑事件（委托给container）
		this.container.onclick = (e) => {
			e = e || window.event;
			let target = e.target || e.srcElement;
			// 获取事件源
			if(target.className === "xBtn") {
				this.container.style.display = "none";
				document.body.removeChild(this.motai);
			}else if (target.className === "sendBtn"){
				// 登录按钮
				this.container.style.display = "none";
				document.body.removeChild(this.motai);
				
				
				console.log(this);
				let weiboin = document.createElement("div");
				weiboin.className = "weiboin";
				let namein=document.querySelector("input");
				let textin=document.querySelectorAll("input")[1];
				console.log(namein);
				console.log(textin);
				if (namein.value==""||textin.value=="") {
					alert("请正确输入用户名与内容！")
				} else{
					// 显示在window
					weiboin.innerHTML = textin.value;
					document.body.appendChild(weiboin);
					console.log(weiboin);
					
					// 添加时间
					let date=new Date();
					let year = date.getFullYear();
					let month = date.getMonth() + 1;
					let nowDate = date.getDate();
					let weibotime = document.createElement("span");
					weibotime.className = "weibotime";
					weibotime.innerHTML = year+"年"+month+"月"+nowDate+"日";
					weiboin.appendChild(weibotime);

					// 将新发的微博加入json
					this.json=Array.from(document.querySelectorAll(".weiboin"));
					console.log(this.json);
					
					// 创建一个ul,防止反复添加
					let ul = document.createElement("ul");
					this.json.forEach(item=>{
						ul.innerHTML = "<li>删除</li>";
						ul.className = "del";
						item.oncontextmenu = (e)=>{
							e=e||event;
							// 阻止右键默认菜单
							e.preventDefault?e.preventDefault():window.returnValue = false;
							ul.remove();
							item.appendChild(ul);
						}
						// 移除ul
						document.onclick=()=>{ul.remove();}
						ul.onclick=()=>{
							ul.remove();
							if(confirm("确定删除这条微博吗？")){
								let datenew=new Date();
								if(datenew-date<120000){
									item.remove();
								}
							}
						}
					})
				}
			}
		}

	}
	init(obj, title) {
		this.obj = obj;
		// 有title拖title，否则就是obj本身
		this.title = title ? this.obj.querySelector(title) : obj;
	
		this.title.onmousedown = (e) => {
			// e = e || window.event;
			// 获取鼠标距离元素左上角的坐标
			let disX = e.offsetX,
				disY = e.offsetY;
			document.onmousemove = (e) => {
				let _top = e.clientY - disY,
					_left = e.clientX - disX;
				this.move(_top, _left);
			}
			// 鼠标抬起，move失效
			document.onmouseup = (e) => {
				document.onmousemove = null;
			}
			// 阻止默认事件
			return false;
		}
	}
	move(top, left) {
		// 考虑边界
		if(left < 0) left = 0;
		if(top < 0) top = 0;
		// 窗口宽度减去盒子自身宽度
		if(left > tools.getBody().width - this.obj.offsetWidth) left = tools.getBody().width - this.obj.offsetWidth;
		if(top > tools.getBody().height - this.obj.offsetHeight) top = tools.getBody().height - this.obj.offsetHeight;
		tools.setStyle(this.obj, {
			left : left + "px",
			top : top + "px"
		})
	}
}
new Send("#send");
