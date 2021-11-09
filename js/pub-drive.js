Physijs.scripts.ammo = 'js/three/engine/ammo.js';
Physijs.scripts.worker = 'js/three/engine/physijs_worker.js';

const $scene = new Physijs.Scene
// const $scene = new THREE.Scene;
const $camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,2000);
const $renderer = new THREE.WebGLRenderer({antialias:true});
const renderCalls = [];
const _key = new THREEx.KeyboardState();
let _orbitControls;
let car = {};
let wheel_fl_c;
let wheel_fr_c;
let wheel_bl_c;
let wheel_br_c;
let roadMap;
let mapW;
let mapH;
let mapBlockW;
let totalMapW;
let totalMapH;
let goalX;
let goalZ;

const threeMotion = (el,lv) => {
	const $el = $(el);
	$el[0].appendChild($renderer.domElement);

	$scene.setGravity(new THREE.Vector3( 0, -30, 0 ));

	// camera setting
	$camera.position.set(120,120,0);

	// render setting
	$renderer.setClearColor(new THREE.Color('#000'));
	$renderer.setPixelRatio( window.devicePixelRatio );
	$renderer.setSize(window.innerWidth,window.innerHeight);
	$renderer.shadowMap.enabled = true;

	mapSetting(0);
	starModel(200);
	groundModel();

	carModel.body();
	carModel.wheel();
	carModel.light();

	requestRender();
	_orbitControls = new THREE.OrbitControls($camera, $renderer.domElement);
	_orbitControls.rotateSpeed = 0.05;
	_orbitControls.autoRotate = true; // 자동 rotate _controls.update()이거 사용해야 한다
	_orbitControls.autoRotateSpeed = 0.05;
	_orbitControls.enableZoom = false; // zoom 활성화
	_orbitControls.enableKeys = false; // 키보드 이동 활성화
	_orbitControls.enableDamping = true; // 움직임 관성 이거 쓰려면 _controls.update()이거 사용해야 한다
	_orbitControls.enablePan = false; // 오른쪽 드래그로 카메라 축 바뀌는 거
	_orbitControls.minPolarAngle = 0; // 수직으로 공전할 수 있는 거리 min
	_orbitControls.maxPolarAngle = Math.PI/2 - 0.2; // 수직으로 공전할수 있는 거리 max
	_orbitControls.dampingFactor = 0.05; //댐핑 관성

	_orbitControls.domElement.addEventListener( 'mousedown', function (e) {
		// console.log('aaaa');
	});
}



let goal = true;
const requestRender = () => {
	drive.stop();
	drive.handling();
	$scene.simulate(); //물리엔진 run

	let destinationX = car.body.position.x >= (goalX*mapBlockW) - (mapBlockW/2) && car.body.position.x <= (goalX*mapBlockW) + (mapBlockW/2);
	let destinationY = car.body.position.z <= -(goalZ*mapBlockW)+(mapBlockW/2) && car.body.position.z >= -(goalZ*mapBlockW)-(mapBlockW/2);
	if (destinationX && destinationY) {
		if(goal) {
			goal = false;
			goalEvent();
		}
	}
	
	if(_orbitControls) _orbitControls.update();
	$camera.lookAt(car.body.position);
	$renderer.render($scene,$camera);

	requestAnimationFrame(requestRender);
	renderCalls.forEach(function(callback) {
		callback();
	});
}

const goalEvent = () => {
	$('.goal-txt').addClass('on');
}

// 지형 모델
const mapSetting = (lv) => {
	if (lv == 0) {
		roadMap = [
			[1,1,0,0,0,0,0,0,0,0],
			[2,1,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0]
		]
		mapBlockW = 30;
	}
	if (lv == 1) {
		roadMap = [
			[1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,2],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0]
		]
		mapBlockW = 60;
	}
	if (lv == 2) {
		roadMap = [
			[1,1,1,1,1,1,1,1,1,1],
			[1,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,1,1,1,1],
			[1,1,1,1,1,1,1,0,0,0],
			[0,0,0,0,1,1,0,0,0,0],
			[0,0,0,0,1,1,0,0,0,0],
			[0,0,0,0,0,1,0,0,0,0],
			[0,0,0,0,0,1,1,1,0,0],
			[0,0,0,0,0,0,0,1,1,0],
			[2,1,1,1,1,1,1,1,1,1]
		]
		mapBlockW = 30;
	}
	if (lv == 3) {
		roadMap = [
			[1,0,0,0,0,0,0,0,0,0],
			[1,1,1,0,0,0,0,0,0,0],
			[0,0,1,0,0,0,0,0,0,0],
			[2,0,1,1,1,0,0,0,0,0],
			[1,1,0,0,1,0,0,0,0,0],
			[0,1,1,0,1,1,1,0,0,0],
			[0,0,1,1,0,0,1,0,0,0],
			[0,0,0,1,1,0,1,1,1,0],
			[0,0,0,0,1,1,0,0,1,0],
			[0,0,0,0,0,1,1,1,1,0]
		]
		mapBlockW = 15;
	}
	if (lv == 4) {
		roadMap = [
			[1,1,1,1,1,1,1,1,1,1],
			[1,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,1,1,1,1],
			[1,1,1,1,1,1,1,0,0,0],
			[0,0,0,0,1,1,0,0,0,0],
			[0,0,0,0,1,1,0,0,0,0],
			[0,0,0,0,0,1,0,0,0,0],
			[0,0,0,0,0,1,1,1,0,0],
			[0,0,0,0,0,0,0,1,1,0],
			[2,1,1,1,1,1,1,1,1,1]
		]
		mapBlockW = 8;
	}
	if (lv == 5) {
		roadMap = [
			[1,1,1,1,1,1,1,1,1,1],
			[1,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,1,1,1,1],
			[1,1,1,1,1,1,1,0,0,0],
			[0,0,0,0,1,1,0,0,0,0],
			[0,0,0,0,1,1,0,0,0,0],
			[0,0,0,0,0,1,0,0,0,0],
			[0,0,0,0,0,1,1,1,0,0],
			[0,0,0,0,0,0,0,1,1,0],
			[2,1,1,1,1,1,1,1,1,1]
		]
		mapBlockW = 6;
	}
	mapW = roadMap[0].length;
	mapH = roadMap.length;
	totalMapW = mapW*mapBlockW;
	totalMapH = mapH*mapBlockW;
}

const starModel = (num) => {
	let randomNum = (min,max) => {
		return Math.random() * (max - min) + min;
	}
	for(let i = 0; i < num; i++) {
		let star = new THREE.SphereGeometry( 0.3, 16, 8 );
		let pointLight = new THREE.PointLight(0xffffff,.2,1);
		pointLight.add( new THREE.Mesh( star, new THREE.MeshBasicMaterial( { color: 0xffffff} ) ) );
		pointLight.position.set(randomNum(-totalMapW,totalMapW),randomNum(-totalMapW,totalMapW),randomNum(-totalMapH,totalMapH));
		$scene.add(pointLight);
	}
}

const groundModel = () => {
	// console.log('ground');
	let groundGeo = new THREE.BoxGeometry(mapBlockW,mapBlockW,1);
	let groundMaterial = Physijs.createMaterial(
		new THREE.MeshLambertMaterial({color: 0x3a3a3a, shininess: 150}),
		5, // 높은 마찰계수
		1 // 낮은 회복
	);
	let groundMaterial2 = Physijs.createMaterial(
		new THREE.MeshLambertMaterial({color: 0xe74f4f, shininess: 150}),
		5, // 높은 마찰계수
		1 // 낮은 회복
	);
	
	let roadSetting = (x,z,a) => {
		let ground = new Physijs.BoxMesh( groundGeo, a, 0);
		ground.receiveShadow = true;
		ground.position.set(x,-5,z);
		ground.rotateX(Math.PI/2);
		$scene.add( ground );
	}
	let loadLight = (x,z) => {
		let pointLight = new THREE.PointLight(0xff0040);
		pointLight.position.set(x,-1,z);
		pointLight.intensity = 6;
		$scene.add(pointLight);
	}

	for(let i = 0; i < mapH; i++) {
		for(let j = 0; j < mapW; j++) {
			if (roadMap[i][j]  == 1) roadSetting(i*mapBlockW,j*-mapBlockW,groundMaterial);
			if (roadMap[i][j] == 2) {
				goalX = i;
				goalZ = j;
				roadSetting(i*mapBlockW,j*-mapBlockW,groundMaterial2);
				loadLight(i*mapBlockW,j*-mapBlockW);
			}
		}
	}
}

// 자동차 모델
const carModel = {
	body : () => {
		// 차체
		let carBodyGeo = new THREE.BoxGeometry(30,5,5);
		let carBodyMaterial = new THREE.MeshStandardMaterial( {color: 0x313131, shininess: 150} );
		car.body = new Physijs.BoxMesh( carBodyGeo, carBodyMaterial, 1000);
		car.body.receiveShadow = true;
		car.body.position.set(0,5,0);
		car.body.scale.set(0.3,0.3,0.3);
		$scene.add(car.body);
	},
	light : () => {
		let light = new THREE.SphereGeometry( 1, 16, 8 );
		let carLight = new THREE.SpotLight(0x0006ff,5);
		carLight.add( new THREE.Mesh( light, new THREE.MeshBasicMaterial( { color: 0x0006ff} ) ) );
		carLight.position.set(-15,0,0);
		carLight.rotateY(90);
		car.body.add(carLight);
	},
	wheel : () => {
		// 차바퀴
		let carWheelGeo = new THREE.CylinderGeometry(2,2,1,8);
		let carWheelMaterial = new THREE.MeshStandardMaterial( {color: 0xc83232, shininess: 150} );
		car.wheel_fl = new Physijs.CylinderMesh(carWheelGeo,carWheelMaterial,1000);
		car.wheel_fr = new Physijs.CylinderMesh(carWheelGeo,carWheelMaterial,1000);
		car.wheel_bl = new Physijs.CylinderMesh(carWheelGeo,carWheelMaterial,1000);
		car.wheel_br = new Physijs.CylinderMesh(carWheelGeo,carWheelMaterial,1000);
		
		const wheelSetting = (wheel,wheelContainer,x,y,z) => {
			wheel.rotateX(Math.PI/2);
			wheel.position.set(x,y,z)
			wheel.scale.set(1,1,1);
			$scene.add(wheel);

			// wheelContainer = new Physijs.DOFConstraint(car.wheel_fl,car.body,new THREE.Vector3(x,y,z));
			// $scene.addConstraint(wheelContainer);
		}
		wheelSetting(car.wheel_fl,wheel_fl_c,-3,0,1.5);
		wheelSetting(car.wheel_fr,wheel_fr_c,-3,0,-1.5);
		wheelSetting(car.wheel_bl,wheel_bl_c,3,0,1.5);
		wheelSetting(car.wheel_br,wheel_br_c,3,0,-1.5);

		wheel_fl_c = new Physijs.DOFConstraint(car.wheel_fl,car.body,new THREE.Vector3(-3,0,1.5));
		wheel_fr_c = new Physijs.DOFConstraint(car.wheel_fr,car.body,new THREE.Vector3(-3,0,-1.5));
		wheel_bl_c = new Physijs.DOFConstraint(car.wheel_bl,car.body,new THREE.Vector3(3,0,1.5));
		wheel_br_c = new Physijs.DOFConstraint(car.wheel_br,car.body,new THREE.Vector3(3,0,-1.5));
		$scene.addConstraint(wheel_fl_c);
		$scene.addConstraint(wheel_fr_c);
		$scene.addConstraint(wheel_bl_c);
		$scene.addConstraint(wheel_br_c);

		wheel_fl_c.setAngularLowerLimit({ x: 0, y: -Math.PI / 8, z: 1 });
		wheel_fl_c.setAngularUpperLimit({ x: 0, y: Math.PI / 8, z: 0 });
		wheel_fr_c.setAngularLowerLimit({ x: 0, y: -Math.PI / 8, z: 1 });
		wheel_fr_c.setAngularUpperLimit({ x: 0, y: Math.PI / 8, z: 0 });
		wheel_bl_c.setAngularLowerLimit({x:0,y:0,z:0});
		wheel_bl_c.setAngularUpperLimit({x:0,y:0,z:0});
		wheel_br_c.setAngularLowerLimit({x:0,y:0,z:0});
		wheel_br_c.setAngularUpperLimit({x:0,y:0,z:0});
	}
}

// 운전
const drive = {
	stop : () => {
		wheel_fl_c.configureAngularMotor( 1, 0, 0, 1, 200 );
		wheel_fr_c.configureAngularMotor( 1, 0, 0, 1, 200 );
		wheel_fl_c.disableAngularMotor( 2 );
		wheel_fr_c.disableAngularMotor( 2 );
		wheel_bl_c.disableAngularMotor( 2 );
		wheel_br_c.disableAngularMotor( 2 );
	},
	handling : () => {
		if (_key.pressed("W")) {
			wheel_bl_c.configureAngularMotor(2, 1, 0, 5, 10000);
			wheel_br_c.configureAngularMotor(2, 1, 0, 5, 10000);
			wheel_bl_c.enableAngularMotor(2);
			wheel_br_c.enableAngularMotor(2);
		}
		if (_key.pressed("A")) {
			wheel_fl_c.configureAngularMotor(1, -Math.PI / 4, Math.PI / 4, 5, 200);
			wheel_fr_c.configureAngularMotor(1, -Math.PI / 4, Math.PI / 4, 5, 200);
			wheel_fl_c.enableAngularMotor(1);
			wheel_fr_c.enableAngularMotor(1);
		}
		if (_key.pressed("D")) {
			wheel_fl_c.configureAngularMotor(1, -Math.PI / 4, Math.PI / 4, -1, 200);
			wheel_fr_c.configureAngularMotor(1, -Math.PI / 4, Math.PI / 4, -1, 200);
			wheel_fl_c.enableAngularMotor(1);
			wheel_fr_c.enableAngularMotor(1);
		}
		if (_key.pressed("S")) {
			wheel_bl_c.configureAngularMotor(2, 1, 0, -5, 10000);
			wheel_br_c.configureAngularMotor(2, 1, 0, -5, 10000);
			wheel_bl_c.enableAngularMotor(2);
			wheel_br_c.enableAngularMotor(2);
		}
		if (_key.pressed("space")) {
			wheel_bl_c.configureAngularMotor(2, 1, 0, 20, 10000);
			wheel_br_c.configureAngularMotor(2, 1, 0, 20, 10000);
			wheel_bl_c.enableAngularMotor(2);
			wheel_br_c.enableAngularMotor(2);
		}
	}
}

// level choice;
$(function () {
	$('.level-wrap button').on('click', function () {
		let lv = $(this).data('level');
		$('.level-wrap').remove();
		mapSetting(lv);
		groundModel();
		_orbitControls.enableZoom = true;
		_orbitControls.autoRotate = false;
	});
});























