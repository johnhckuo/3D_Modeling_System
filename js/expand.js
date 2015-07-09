function CollapseExpand(id) {
			var divObject = document.getElementById(id);
			console.log(divObject);
			var currentCssClass = divObject.className;
			if (divObject.className == "modelon"){
			//	showbasicHelp();
				divObject.style.WebkitAnimationName = 'fadin';
				setTimeout(function () {  
					divObject.className = "modeloff";
				}, 10);  
				window.removeEventListener('keydown',keyboardMove,false); //zhen //清除移動圖檔
			}
			else{
				divObject.style.WebkitAnimationName = 'fadout';
				setTimeout(function () {  
					divObject.className = "modelon";
				}, 10);  
			}
			
			var helper = document.getElementById('helper');
			var helperback = document.getElementById('helperback');
			var content2 = document.getElementById("helperContent2");
			var content = document.getElementById("helperContent");
			helper.style.opacity = 1;
			helperback.style.opacity = .7;

			switch (id){
				case "modeloff1":

					helper.style.height = 180;
					document.getElementById("helperContent").innerHTML = "<h2>3D文字模式教學</h2>此模式可建立英文單字的3D模型，操作流程如下：<p>1. 輸入文字的尺寸大小。<p> 2. 選擇文字厚度。<p>3. 選擇文字字體，目前系統僅支援英文字體。";
					break;
				case "modeloff2":
						
					helper.style.height = 105;
					document.getElementById("helperContent").innerHTML = "<h2>3D印章模式教學</h2>此模式可建立客製化的個人印章，請先輸入欲刻在印章上的文字，在按下「產生模型」即可完成。";
					break;
				case "modeloff3":
					
					helper.style.height = 270;
					document.getElementById("helperContent").innerHTML = "<h2>3D手繪模式教學</h2>試想像繪圖面板即為小畫家的畫布，而滑鼠便是筆刷，可直接進行3D圖檔的繪製，其操作流程為：<p>1. 依使用者喜好挑選筆刷粗細。<p>2. 按下「開啟」並進行創作。<p>3. 若要複製特定層數的作品至另外一層，請輸入來源層和目的層，如：複製0層至2層。<p>4. 複製功能又可分為多層複製和單層複製。<p>5. 結束繪畫後，請務必關閉3D手繪模式。<p>附註：3D手繪圖檔轉檔過程較為複雜，請耐心等候。";
					break;
				case "modeloff4":
					

					helper.style.height = 170;
					document.getElementById("helperContent").innerHTML = "<h2>3D模型建置教學</h2>此模式提供使用者特定的圖形或基本輪廓，達到點綴裝飾的效果，其注意事項如下：<p>1. MineCraft模式開啟前，請先輸入方塊尺寸。<p>2. 產生出的3D模型，皆可透過右邊「Advance」面版進行進階控制。";
					break;
				case "modeloff5":
		
					helper.style.height = 260;
					document.getElementById("helperContent").innerHTML = "<h2>3D房屋建置教學</h2>此模式針對模型玩家，提供基本室內模型的建置功能，其教學如下所示：<p>1. 種樹模式為裝飾房屋模型用，無法輸出成3D圖檔。<p>2. 欲建立房屋，請先輸入房屋的長、寬、高。<p>3. 「窗戶」模式僅允許使用者在「房屋」和「牆壁」上建置窗戶，建置完畢後請務必關閉「窗戶」模式。<p>4. 欲使用「柵欄」模式前，請先輸入柵欄長度。<p>5. 全部建置完成後，若使用者想以第一人稱視角瀏覽房屋內部結構，可使用「室內瀏覽模式」。";
					break;
				case "modeloff6":
				
					helper.style.height = 110;
					document.getElementById("helperContent").innerHTML = "<h2>觀看角度調整教學</h2>此功能可允許使用者調整視角，並將之調整至最精確的位置，以方便後續繪圖建模的工作，其中需注意「360度觀看」模式開啟前，需先指定一特定物件，方可開啟。";
					break;
			}
		}