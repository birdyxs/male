function openTab(evt, tabName) {
            let contents = document.getElementsByClassName("tab-content");
            for (let c of contents) c.classList.remove("active");
            let buttons = document.getElementsByClassName("btn");
            for (let b of buttons) b.classList.remove("active");
            document.getElementById(tabName).classList.add("active");
            evt.currentTarget.classList.add("active");
            
            // Intento forzado de reproducir con sonido tras el clic del usuario
            const vid = document.getElementById('musicVideo');
            if (vid) {
                vid.play().catch(error => {
                    console.log("El navegador bloqueó el audio inicial hasta una interacción mayor.");
                });
            }
        }

        function openImage(src) {
            const modal = document.getElementById("imageModal");
            const modalImg = document.getElementById("imgFull");
            modal.style.display = "flex";
            modalImg.src = src;
        }

        function closeImage() {
            document.getElementById("imageModal").style.display = "none";
        }

        // --- EFECTO ESPACIAL ---
        let scene, camera, renderer, stars = [], ship;
        let mouseX = 0, mouseY = 0;

        function init() {
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.z = 20;
            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.getElementById('world').appendChild(renderer.domElement);

            const starGeo = new THREE.BufferGeometry();
            const starCoords = [];
            for (let i = 0; i < 1500; i++) {
                starCoords.push(Math.random() * 100 - 50, Math.random() * 100 - 50, Math.random() * 100 - 50);
            }
            starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starCoords, 3));
            const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 });
            const starPoints = new THREE.Points(starGeo, starMat);
            scene.add(starPoints);
            stars.push(starPoints);

            const shipGroup = new THREE.Group();
            const bodyGeo = new THREE.CylinderGeometry(0, 0.5, 2, 6);
            const bodyMat = new THREE.MeshBasicMaterial({ color: 0x00ff41, wireframe: true });
            const body = new THREE.Mesh(bodyGeo, bodyMat);
            body.rotation.x = Math.PI / 2;
            shipGroup.add(body);
            ship = shipGroup;
            scene.add(ship);
            animate();
        }

        function animate() {
            requestAnimationFrame(animate);
            stars[0].position.z += 0.15;
            if (stars[0].position.z > 30) stars[0].position.z = 0;
            let targetX = (mouseX * 15);
            let targetY = (mouseY * 8);
            ship.position.x += (targetX - ship.position.x) * 0.05;
            ship.position.y += (targetY - ship.position.y) * 0.05;
            renderer.render(scene, camera);
        }

        window.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
        });

        init();