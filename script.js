// Matrix Rain Effect
        const matrixCanvas = document.getElementById('matrixCanvas');
        const matrixCtx = matrixCanvas.getContext('2d');
        
        let matrixWidth, matrixHeight;
        let columns = [];
        const fontSize = 14;
        const dropColor = '#6366f1';
        const nameChars = 'ETANMCCRTNEY'; // Your name letters
        const codeChars = '01';
        const trailLength = 18;
        const frameInterval = 60;
        let animationFrameId = null;
        let lastFrameTime = 0;
        let frameAccumulator = 0;
        
        function initMatrixRain() {
            const dpr = window.devicePixelRatio || 1;
            matrixWidth = matrixCanvas.clientWidth || window.innerWidth;
            matrixHeight = matrixCanvas.clientHeight || window.innerHeight;
            matrixCanvas.width = Math.floor(matrixWidth * dpr);
            matrixCanvas.height = Math.floor(matrixHeight * dpr);
            matrixCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
            
            const numColumns = Math.floor(matrixWidth / fontSize);
            columns = [];
            
            for (let i = 0; i < numColumns; i++) {
                columns[i] = {
                    row: Math.floor(Math.random() * -(matrixHeight / fontSize)),
                    chars: Array.from({ length: trailLength }, randomRainChar),
                    isNameChar: Math.random() > 0.7
                };
            }
        }

        function randomRainChar() {
            return Math.random() > 0.7 ?
                nameChars[Math.floor(Math.random() * nameChars.length)] :
                codeChars[Math.floor(Math.random() * codeChars.length)];
        }
        
        function drawMatrixRain(currentTime) {
            if (!lastFrameTime) {
                lastFrameTime = currentTime;
            }

            const deltaSeconds = Math.min((currentTime - lastFrameTime) / 1000, 0.05);
            lastFrameTime = currentTime;
            frameAccumulator += deltaSeconds * 1000;

            while (frameAccumulator >= frameInterval) {
                stepMatrixRain();
                frameAccumulator -= frameInterval;
            }

            matrixCtx.clearRect(0, 0, matrixWidth, matrixHeight);
            
            matrixCtx.font = fontSize + 'px "Fira Code", monospace';
            matrixCtx.textBaseline = 'top';
            
            for (let i = 0; i < columns.length; i++) {
                const drop = columns[i];

                for (let trailIndex = 0; trailIndex < trailLength; trailIndex++) {
                    const trailY = (drop.row - trailIndex) * fontSize;

                    if (trailY < -fontSize || trailY > matrixHeight) {
                        continue;
                    }

                    const alpha = Math.max(0.22, 0.82 - trailIndex * 0.035);
                    const trailChar = drop.chars[trailIndex];
                    matrixCtx.fillStyle = drop.isNameChar && trailIndex === 0 ?
                        dropColor :
                        `rgba(99, 102, 241, ${alpha})`;
                    matrixCtx.fillText(trailChar, i * fontSize, trailY);
                }
            }
            
            animationFrameId = requestAnimationFrame(drawMatrixRain);
        }

        function stepMatrixRain() {
            const maxRow = Math.ceil(matrixHeight / fontSize);

            for (const drop of columns) {
                if (drop.row > maxRow + trailLength && Math.random() > 0.975) {
                    drop.row = -1;
                    drop.chars = Array.from({ length: trailLength }, randomRainChar);
                    drop.isNameChar = Math.random() > 0.7;
                    continue;
                }

                drop.row += 1;
                drop.chars.unshift(randomRainChar());
                drop.chars.length = trailLength;

                if (Math.random() > 0.9) {
                    drop.isNameChar = Math.random() > 0.7;
                }
            }
        }

        function startMatrixRain() {
            if (animationFrameId !== null) {
                return;
            }

            lastFrameTime = 0;
            frameAccumulator = 0;
            animationFrameId = requestAnimationFrame(drawMatrixRain);
        }
        
        initMatrixRain();
        startMatrixRain();
        
        window.addEventListener('resize', () => {
            initMatrixRain();
        });
        
        // Project details data
        const projectDetails = {
            1: {
                title: 'Aircraft Wing Spar Numerical Design Optimization',
                date: 'Nov 2025 - Dec 2025',
                description: 'Engineered a robust MATLAB-based constrained design optimization that leverages Gauss-Hermite quadrature, complex-step gradient computation, and MATLAB\'s fmincon function to minimize the spar mass of an experimental high-performance UAV while enforcing stress safety margins under loading uncertainty. Parameterized the geometry with 15 nodes and 30 total design variables, then validated the optimum with mesh and quadrature convergence studies. Delivered a 71% weight reduction against the nominal design.',
                technical: [
                    'Gauss-Hermite quadrature for uncertainty quantification',
                    'Complex-step gradient computation for sensitivity analysis',
                    'MATLAB fmincon for constrained optimization',
                    '15 geometry nodes with 30 total design variables',
                    'Mesh and quadrature convergence validation',
                    'Six-sigma safety margin enforcement (≤ 600 MPa)',
                    '71% weight reduction against nominal design'
                ],
                media: [
                    {
                        type: 'image',
                        src: 'assets/images/wing-spar-optimization-(optimal-design-shape).png',
                        alt: 'Optimized wing spar design shape',
                        caption: 'Final optimized wing spar design shape'
                    },
                    {
                        type: 'image',
                        src: 'assets/images/wing-spar-optimization-(optimal-design-stress-distribution).png',
                        alt: 'Optimal wing spar stress distribution',
                        caption: 'Final stress distribution for the optimized design'
                    }
                ],
                links: [
                    {
                        label: 'GitHub Repository (Code + Technical Report)',
                        href: 'https://github.com/Master-Pr0grammer/Aircraft-Wing-Spar-Optimization'
                    }
                ],
                tags: ['MATLAB', 'Optimization', 'Gauss-Hermite Quadrature', 'Complex-Step', 'Uncertainty'],
                category: 'engineering'
            },
            2: {
                title: 'RL Training in Scalable Vectorized GPU Accelerated Environment',
                date: 'Jan 2024 - Jul 2024',
                description: 'Vectorized a 2-D obstacle-avoidance game in PyTorch, enabling 10k+ parallel simulations on a single consumer GPU. Designed a self-supervised reward signal (positive & soft-target negative) and trained a neural network over 10k episodes, increasing average survival time from 4s to 78s, with the final performance rivaling human performance.',
                technical: [
                    'PyTorch vectorization for 10k+ parallel simulations',
                    'Self-supervised reward signal design',
                    'Trained neural network over 10k episodes',
                    'Survival time improvement from 4s to 78s',
                    'GPU acceleration for scalable training',
                    'Human-level performance achieved'
                ],
                tags: ['PyTorch', 'RL', 'Vectorization', 'GPU', 'Deep Learning'],
                category: 'machinelearning'
            },
            3: {
                title: 'C++ Game Engine from Scratch',
                date: 'Dec 2023 - Present',
                description: 'Built a cross-platform C++ OpenGL engine with model loading, camera/input system, transforms, and basic physics/collision. Implemented lighting/shader pipeline (single-light) and real-time rendering; optimized frame loop and debug tools for iteration. Achieved over 3,000 FPS with a simplistic scene consisting of a single high fidelity model with lighting running on a RTX 3060ti.',
                technical: [
                    'Cross-platform C++ OpenGL engine',
                    'Model loading with transform hierarchy',
                    'Camera and input system implementation',
                    'Basic physics and collision detection',
                    'Single-light shader pipeline',
                    'Real-time rendering optimization',
                    'Frame loop optimization achieving 3,000+ FPS'
                ],
                media: [
                    {
                        type: 'video',
                        src: 'assets/videos/c++-game-engine-from-scratch-(demo).mp4',
                        caption: 'Game engine demo'
                    },
                    {
                        type: 'image',
                        src: 'assets/images/c++-game-engine-from-scratch-(demo-poster).png',
                        alt: 'C++ game engine demo poster',
                        caption: 'Game engine demo poster frame'
                    }
                ],
                tags: ['C++', 'OpenGL', 'Graphics', 'Shaders', 'Physics', 'Rendering'],
                category: 'software'
            },
            4: {
                title: 'Neural Network From Scratch',
                date: 'May 2023 - Jul 2023',
                description: 'Built a fully-featured neural-network library in Python + NumPy that supports arbitrary layer configurations, forward/back-propagation, custom loss/optimizer modules, and a high-level training API comparable to PyTorch. Implemented comprehensive gradient checking, learning rate scheduling, and early stopping mechanisms.',
                technical: [
                    'Python + NumPy neural network library',
                    'Arbitrary layer configuration support',
                    'Forward and back-propagation implementation',
                    'Custom loss and optimizer modules',
                    'High-level training API',
                    'Gradient checking and validation',
                    'Learning rate scheduling',
                    'Early stopping mechanisms'
                ],
                links: [
                    {
                        label: 'GitHub Repository',
                        href: 'https://github.com/Master-Pr0grammer/Neural_Network'
                    }
                ],
                tags: ['Python', 'NumPy', 'ML', 'Deep Learning', 'Neural Networks'],
                category: 'machinelearning'
            },
            5: {
                title: 'Language Model from Scratch',
                date: 'Jul 2023 - Aug 2023',
                description: 'Implemented a decoder-only Transformer from scratch in PyTorch (causal self-attention, MLP blocks, residuals, layer norm), with full training loop (AdamW, LR scheduling, checkpointing, & early stopping). Trained a ~20M parameter character-level model; built preprocessing/data pipeline and evaluation via validation loss/perplexity. Implemented beam-search decoding to improve generation quality on small-context models during inference.',
                technical: [
                    'Decoder-only Transformer architecture',
                    'Causal self-attention implementation',
                    'MLP blocks and residual connections',
                    'Layer normalization and dropout',
                    'AdamW optimizer and learning rate scheduling',
                    'Checkpointing and early stopping',
                    '~20M parameter character-level model',
                    'Beam-search decoding for inference',
                    'Validation loss and perplexity evaluation'
                ],
                tags: ['PyTorch', 'Transformer', 'LLM', 'Attention', 'Deep Learning'],
                category: 'machinelearning'
            },
            6: {
                title: 'Robotic Arm Kinematics',
                date: 'Nov 2023 - Dec 2023',
                description: 'Implemented forward and inverse kinematics for a 6-DOF robotic arm in Python using a Jacobian-inverse approach; integrated PID joint control to stabilize motion and reduce error. Implemented real-time object detection/tracking on a uniform background and fused vision feedback with IK to command the arm to follow moving targets.',
                technical: [
                    '6-DOF robotic arm implementation',
                    'Forward and inverse kinematics',
                    'Jacobian-inverse approach',
                    'PID joint control for stabilization',
                    'Real-time object detection',
                    'Vision feedback integration with IK',
                    'Moving target tracking'
                ],
                tags: ['Python', 'Kinematics', 'Robotics', 'Computer Vision', 'PID'],
                category: 'software engineering'
            },
            7: {
                title: 'Self-Balancing Inverted Pendulum Control System',
                date: 'Feb 2025 - May 2025',
                description: 'Designed a control system self-balancing for an inverted pendulum controlled by a 20N brushless motor driving a reaction wheel. Modeled the dynamics of an inverted pendulum and derived the plant\'s transfer functions in Zero-Pole-Gain (ZPK) form, and identified unknown transfer functions via black box frequency-response testing. Designed a PID controller that met the design specification of  < 15% overshoot and 0.5 - 3 s settling time, achieving  12% overshoot, with 0.8 s settling time. Validated stability with root-locus, Bode, and step-response analyses and confirmed the actuator torque stayed within the motor\'s limits.',
                technical: [
                    'Inverted pendulum dynamics modeling',
                    'Transfer function derivation in ZPK form',
                    'Black box frequency-response testing',
                    'PID controller design and tuning',
                    'Root-locus, Bode, and step-response analysis',
                    '20N brushless motor with reaction wheel',
                    '15% overshoot, 0.8s settling time achieved'
                ],
                tags: ['Control Systems', 'PID', 'Feedback', 'ZPK', 'Robotics'],
                category: 'engineering'
            },
            8: {
                title: 'Heat Exchanger Design & Optimization for Solar-Cell Array',
                date: 'Sept 2025 - Dec 2025',
                description: 'Engineered a liquid-cooled heat-sink for a 1 m x 1 m panel of photovoltaic cells, keeping the cells at ≤ 35 °C under a peak irradiance of 1000 W/m². Developed symbolic thermal & fluid models and performed parametric design iterations to optimize design, select a coolant to prevent freezing, limit coolant velocity to < 5 m/s, and limit pump power to < 5% of the generated electricity. Achieved a max temperature of 34 ℃ with the pump using only 0.222% of total panel power output. Delivered 3D CAD drawings, an Excel workbook with all annotated calculations, and a 20‑page technical report.',
                technical: [
                    'Liquid-cooled heat-sink design',
                    'Thermal & fluid modeling',
                    'PV panel thermal management',
                    'Coolant selection for freezing prevention',
                    'Velocity and pump power constraints',
                    'Max temperature of 34°C achieved',
                    '0.222% pump power utilization'
                ],
                tags: ['Thermal Design', 'Fluid Dynamics', 'CAD', 'Optimization', 'Solar'],
                category: 'engineering'
            },
            9: {
                title: 'Wordle Server from Scratch',
                date: 'Mar 2024 - Mar 2024',
                description: 'Built a multithreaded TCP server in C (POSIX sockets) supporting concurrent clients; used mutex-protected shared state and a custom message protocol with robust input validation. Implemented clean client lifecycle handling (connect/disconnect/timeouts) and deterministic game logic.',
                technical: [
                    'Multithreaded TCP server in C',
                    'POSIX sockets for networking',
                    'Concurrent client support',
                    'Mutex-protected shared state',
                    'Custom message protocol',
                    'Robust input validation',
                    'Client lifecycle management (connect/disconnect/timeouts)'
                ],
                tags: ['C', 'Networking', 'Multithreading', 'Sockets', 'Game Server'],
                category: 'software'
            },
            10: {
                title: 'LLM Full-Stack Integration',
                date: 'May 2024 - Aug 2024',
                description: 'Designed and deployed a self-hosted LLM llama.cpp server on a custom built Ubuntu machine. Built an OpenAI-compatible API with FastAPI to expose the system. Integrated Retrieval-Augmented Generation with vector embeddings, added function-calling (search, calculator, TTS, memory management), and delivered a responsive Flask based web UI, enabling a versatile AI assistant.',
                technical: [
                    'Self-hosted llama.cpp server',
                    'OpenAI-compatible API with FastAPI',
                    'Retrieval-Augmented Generation with vector embeddings',
                    'Function-calling implementation',
                    'Flask-based web UI',
                    'Versatile AI assistant capabilities'
                ],
                media: [
                    {
                        type: 'video',
                        src: 'assets/videos/llm-full-stack-integration-(jarvis-demo).mp4',
                        caption: 'Jarvis web app demo'
                    },
                    {
                        type: 'image',
                        src: 'assets/images/llm-full-stack-integration-(jarvis-demo-poster).png',
                        alt: 'Jarvis demo poster',
                        caption: 'Jarvis demo poster frame'
                    }
                ],
                tags: ['FastAPI', 'LLM', 'RAG', 'Flask', 'Function Calling'],
                category: 'software'
            },
            11: {
                title: 'CPU Scheduling Algorithms',
                date: 'Mar 2024 - Apr 2024',
                description: 'Implemented and benchmarked FCFS, SJF, SRTF, & Round Robin; measured turnaround time, waiting time, response time, throughput across synthetic workloads and compared tradeoffs. Built a workload generator (burst/arrival distributions) and produced a small report summarizing scheduler behavior under I/O-bound vs CPU-bound mixes.',
                technical: [
                    'FCFS, SJF, SRTF, and Round Robin implementations',
                    'Performance metrics: turnaround time, waiting time, response time, throughput',
                    'Synthetic workload generation',
                    'Burst/arrival distribution modeling',
                    'I/O-bound vs CPU-bound analysis'
                ],
                tags: ['Algorithms', 'OS', 'Benchmarking', 'Performance', 'Scheduling'],
                category: 'software'
            },
            12: {
                title: 'Recursive Crossword Puzzle Algorithm',
                date: 'Mar 2023 - Mar 2023',
                description: 'Engineered a recursive algorithm in C++ to generate all possible crossword puzzles from a user-defined list of included words, excluded words, and puzzle dimensions. Leveraging a dynamic blend of depth-first and breadth-first search techniques, along with strategic symmetry utilization, the algorithm achieved remarkable computational efficiency.',
                technical: [
                    'Recursive crossword generation algorithm',
                    'Depth-first and breadth-first search',
                    'User-defined word lists (included/excluded)',
                    'Puzzle dimension configuration',
                    'Symmetry utilization for efficiency'
                ],
                tags: ['C++', 'Algorithms', 'Backtracking', 'DFS', 'Crossword'],
                category: 'software'
            },
            13: {
                title: 'Wordle Solver',
                date: 'Sept 2021 - Jan 2022',
                description: 'Developed an information-theoretic Wordle solver that evaluates the full vocabulary to select guesses with maximal entropy reduction. Achieved a 100% win rate with optimal guess counts, highlighting algorithmic optimization and exhaustive-search efficiency.',
                technical: [
                    'Information-theoretic guess selection',
                    'Entropy-based word ranking',
                    'Exhaustive search across valid vocabulary',
                    '100% win rate with optimal guess counts',
                    'Constraint-based elimination strategy'
                ],
                links: [
                    {
                        label: 'GitHub Repository',
                        href: 'https://github.com/Master-Pr0grammer/Wordle_Solver'
                    }
                ],
                tags: ['Algorithms', 'Python', 'Information Theory', 'Optimization', 'Wordle'],
                category: 'software'
            },
            14: {
                title: 'Visualizing AI Learning',
                date: 'Summer 2023',
                description: 'Built a visualization pipeline that turns neural network training into a video, letting you watch an AI learn an image over time. Switched from a CPU-bound custom implementation to PyTorch so the training process could take advantage of GPU acceleration.',
                technical: [
                    'Training-step image sampling pipeline',
                    'Video generation from model snapshots',
                    'PyTorch-based GPU acceleration',
                    'Image reconstruction learning visualization',
                    'End-to-end demo of neural network convergence'
                ],
                media: [
                    {
                        type: 'video',
                        src: 'assets/videos/ai-learning-visualization-(demo).mp4',
                        caption: 'AI learning visualization demo'
                    },
                    {
                        type: 'image',
                        src: 'assets/images/ai-learning-visualization-(smiley-face-target).png',
                        alt: 'AI learning target image',
                        caption: 'Smiley-face target used in the demo'
                    }
                ],
                links: [
                    {
                        label: 'GitHub Repository',
                        href: 'https://github.com/Master-Pr0grammer/AI_Learning_Video'
                    }
                ],
                tags: ['PyTorch', 'Visualization', 'Deep Learning', 'Video Generation', 'GPU'],
                category: 'machinelearning'
            },
            15: {
                title: 'Platform Jumper (Python Game)',
                date: 'Dec 2020 - Jan 2021',
                description: 'Engineered a 2-D platformer in Python and Pygame with a custom dynamic-hitbox collision system, particle-trail animation, and an infinitely tiling background. It was an early project, but a big step up in mechanics, polish, and physics thinking from the first game.',
                technical: [
                    'Python and Pygame platformer',
                    'Dynamic hitbox collision system',
                    'Particle-trail animation effect',
                    'Infinitely tiling background system',
                    'Level traversal and platforming mechanics'
                ],
                media: [
                    {
                        type: 'video',
                        src: 'assets/videos/platform-jumper-(gameplay).mp4',
                        caption: 'Platform Jumper gameplay'
                    },
                    {
                        type: 'image',
                        src: 'assets/images/platform-jumper-(poster).png',
                        alt: 'Platform Jumper poster image',
                        caption: 'Platform Jumper poster frame'
                    }
                ],
                tags: ['Python', 'Pygame', 'Game Development', 'Collision', 'Animation'],
                category: 'software'
            },
            16: {
                title: 'Space Raiders (Python Game)',
                date: 'Aug 2020 - Sept 2020',
                description: 'Created a Python and Pygame arcade prototype in a single day, implementing dynamic asteroid-speed scaling, real-time scoring, and collision detection. It was my first real program and the project that kicked off everything else.',
                technical: [
                    'Python and Pygame arcade prototype',
                    'Dynamic difficulty scaling',
                    'Real-time score tracking',
                    'Collision detection gameplay loop',
                    'Built in a single day as a first project'
                ],
                media: [
                    {
                        type: 'video',
                        src: 'assets/videos/space-raiders-(gameplay).mp4',
                        caption: 'Space Raiders gameplay'
                    },
                    {
                        type: 'image',
                        src: 'assets/images/space-raiders-(menu-screen).png',
                        alt: 'Space Raiders menu screen',
                        caption: 'Space Raiders menu screen'
                    }
                ],
                tags: ['Python', 'Pygame', 'Game Development', 'Arcade', 'First Project'],
                category: 'software'
            }
        };
        // Modal elements
        const modalOverlay = document.getElementById('modalOverlay');
        const modalClose = document.getElementById('modalClose');
        const modalTitle = document.getElementById('modalTitle');
        const modalDate = document.getElementById('modalDate');
        const modalDescription = document.getElementById('modalDescription');
        const modalMedia = document.getElementById('modalMedia');
        const modalTechnical = document.getElementById('modalTechnical');
        const modalLinks = document.getElementById('modalLinks');
        const modalFooter = document.getElementById('modalFooter');
        // Filter elements
        const filterBtns = document.querySelectorAll('.filter-btn');

        function renderProjectMedia(mediaItems = []) {
            modalMedia.innerHTML = '';

            if (!mediaItems.length) {
                return;
            }

            let activeIndex = 0;
            const carousel = document.createElement('div');
            const stage = document.createElement('div');
            const frame = document.createElement('div');
            const prevButton = document.createElement('button');
            const nextButton = document.createElement('button');
            const meta = document.createElement('div');
            const caption = document.createElement('p');
            const count = document.createElement('span');

            carousel.className = 'modal-carousel';
            stage.className = 'modal-carousel-stage';
            frame.className = 'modal-carousel-frame';
            prevButton.className = 'modal-carousel-btn prev';
            nextButton.className = 'modal-carousel-btn next';
            meta.className = 'modal-carousel-meta';
            caption.className = 'modal-carousel-caption';
            count.className = 'modal-carousel-count';
            prevButton.type = 'button';
            nextButton.type = 'button';
            prevButton.setAttribute('aria-label', 'Previous project image');
            nextButton.setAttribute('aria-label', 'Next project image');
            prevButton.textContent = '‹';
            nextButton.textContent = '›';

            mediaItems.forEach(item => {
                const mediaFigure = document.createElement('figure');
                const mediaElement = item.type === 'video' ?
                    document.createElement('video') :
                    document.createElement('img');

                mediaElement.src = item.src;

                if (item.type === 'video') {
                    mediaElement.controls = true;
                    mediaElement.playsInline = true;
                    mediaElement.preload = 'auto';
                    mediaElement.autoplay = true;
                    mediaElement.muted = true;
                    mediaElement.loop = true;
                } else {
                    mediaElement.alt = item.alt || '';
                    mediaElement.loading = 'eager';
                    mediaElement.decoding = 'async';
                }

                mediaFigure.appendChild(mediaElement);
                frame.appendChild(mediaFigure);
            });

            function updateCarousel() {
                const item = mediaItems[activeIndex];
                frame.style.transform = `translateX(-${activeIndex * 100}%)`;
                caption.textContent = item.caption || '';
                count.textContent = `${activeIndex + 1} / ${mediaItems.length}`;
                prevButton.classList.toggle('hidden', activeIndex === 0);
                nextButton.classList.toggle('hidden', activeIndex === mediaItems.length - 1);
            }

            prevButton.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation();
                if (activeIndex === 0) return;

                activeIndex -= 1;
                updateCarousel();
            });

            nextButton.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation();
                if (activeIndex === mediaItems.length - 1) return;

                activeIndex += 1;
                updateCarousel();
            });

            stage.append(frame, prevButton, nextButton);
            meta.append(caption, count);
            carousel.append(stage, meta);
            modalMedia.appendChild(carousel);
            updateCarousel();
        }

        // Open modal with project details
        function openModal(projectId) {
            const project = projectDetails[projectId];
            if (!project) return;
            modalTitle.textContent = project.title;
            modalDate.textContent = project.date;
            modalDescription.textContent = project.description;
            renderProjectMedia(project.media);
            
            // Update technical details
            modalTechnical.innerHTML = project.technical.map(detail => 
                `<li>${detail}</li>`
            ).join('');
            // Update project links
            const linkMarkup = (project.links || []).map(link =>
                `<a class="modal-resource-link" href="${link.href}" target="_blank" rel="noopener noreferrer">${link.label} →</a>`
            ).join('');
            modalLinks.innerHTML = linkMarkup ?
                `<span class="modal-section-title">Project Links</span><div class="modal-links">${linkMarkup}</div>` :
                '';

            // Update tags
            const tagMarkup = project.tags.map(tag => 
                `<span class="tag highlight">${tag}</span>`
            ).join('');
            modalFooter.innerHTML = `
                <div class="modal-tags">${tagMarkup}</div>
            `;
            modalOverlay.classList.add('active');
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = scrollbarWidth ? `${scrollbarWidth}px` : '';
        }
        // Close modal
        function closeModal() {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        }
        // Filter projects
        function filterProjects(category) {
            const cards = document.querySelectorAll('.project-card');
            
            cards.forEach(card => {
                // Check if project has this category OR is in the engineering category
                const cardCategories = card.dataset.category.split(' ');
                if (category === 'all' || cardCategories.includes(category)) {
                    card.classList.add('visible');
                } else {
                    card.classList.remove('visible');
                }
            });
            // Update active button
            filterBtns.forEach(btn => {
                btn.classList.remove('active');
                if (btn.dataset.filter === category) {
                    btn.classList.add('active');
                }
            });
        }
        // Event listeners
        modalClose.addEventListener('click', closeModal);
        
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
                closeModal();
            }
        });
        // Filter button clicks
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterProjects(btn.dataset.filter);
            });
        });
        // Add click handlers to project links
        document.querySelectorAll('.project-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const projectId = link.closest('.project-card').dataset.project;
                openModal(projectId);
            });
        });
        // Intersection Observer for fade-in animations
        document.addEventListener('DOMContentLoaded', () => {
            // Initial filter to show all projects
            filterProjects('all');
            
            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            };
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, observerOptions);
            const fadeElements = document.querySelectorAll('.fade-in');
            fadeElements.forEach(el => observer.observe(el));
            // Smooth scroll for navigation links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
            // Add subtle parallax effect to hero
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const hero = document.querySelector('.hero');
                if (hero && scrolled < window.innerHeight) {
                    hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
                }
            });
        });
