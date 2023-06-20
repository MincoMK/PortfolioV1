import React, { useEffect } from 'react'
import styled from 'styled-components'
import Screen from './Screen'

const TerminalContainer = styled.div`
width: 100%;
height: 100%;
background-color: #161f2e;
color: #fff;
padding: 3px;
font-family: 'Fira Code', monospace;
font-size: 8px;
border: 2px solid #343e6b;
`;

const TerminalText = styled.div`
width: 100%;
height: 100%;
padding: 3px;
border: 2px solid #343e6b;
overflow-y: scroll;
overflow-x: hidden;
white-space: pre-wrap;

&::-webkit-scrollbar {
	width: 0px;
	background: transparent;
}
-ms-overflow-style: none;
scrollbar-width: none;

&:focus {
	outline: none;
}

&::selection {
	background-color: #6272a4;
	color: #fff;
}
`;

const MobileInput = styled.input`
width: 0;
height: 0;
opacity: 0;
position: absolute;
top: 0;
left: 0;
`

const Red = styled.span`
color: #ff5555;
`;

const Green = styled.span`
color: #50fa7b;
`;

const Blue = styled.span`
color: #218fee;
`;

const minco_b64 = 'ICAgICAgICAgIF9fX19fICAgICAgICAgICAgICAgICAgICBfX19fXyAgICAgICAgICAgICAgICAgICAgX19fX18gICAgICAgICAgICAgICAgICAgIF9fX19fICAgICAgICAgICAgICAgICAgIF9fX19fX18gICAgICAgICAKICAgICAgICAgL1wgICAgXCAgICAgICAgICAgICAgICAgIC9cICAgIFwgICAgICAgICAgICAgICAgICAvXCAgICBcICAgICAgICAgICAgICAgICAgL1wgICAgXCAgICAgICAgICAgICAgICAgLzo6XCAgICBcICAgICAgICAKICAgICAgICAvOjpcX19fX1wgICAgICAgICAgICAgICAgLzo6XCAgICBcICAgICAgICAgICAgICAgIC86OlxfX19fXCAgICAgICAgICAgICAgICAvOjpcICAgIFwgICAgICAgICAgICAgICAvOjo6OlwgICAgXCAgICAgICAKICAgICAgIC86Ojo6fCAgIHwgICAgICAgICAgICAgICAgXDo6OlwgICAgXCAgICAgICAgICAgICAgLzo6Ojp8ICAgfCAgICAgICAgICAgICAgIC86Ojo6XCAgICBcICAgICAgICAgICAgIC86Ojo6OjpcICAgIFwgICAgICAKICAgICAgLzo6Ojo6fCAgIHwgICAgICAgICAgICAgICAgIFw6OjpcICAgIFwgICAgICAgICAgICAvOjo6Ojp8ICAgfCAgICAgICAgICAgICAgLzo6Ojo6OlwgICAgXCAgICAgICAgICAgLzo6Ojo6Ojo6XCAgICBcICAgICAKICAgICAvOjo6Ojo6fCAgIHwgICAgICAgICAgICAgICAgICBcOjo6XCAgICBcICAgICAgICAgIC86Ojo6Ojp8ICAgfCAgICAgICAgICAgICAvOjo6L1w6OjpcICAgIFwgICAgICAgICAvOjo6L35+XDo6OlwgICAgXCAgICAKICAgIC86OjovfDo6fCAgIHwgICAgICAgICAgICAgICAgICAgXDo6OlwgICAgXCAgICAgICAgLzo6Oi98Ojp8ICAgfCAgICAgICAgICAgIC86OjovICBcOjo6XCAgICBcICAgICAgIC86OjovICAgIFw6OjpcICAgIFwgICAKICAgLzo6Oi8gfDo6fCAgIHwgICAgICAgICAgICAgICAgICAgLzo6OjpcICAgIFwgICAgICAvOjo6LyB8Ojp8ICAgfCAgICAgICAgICAgLzo6Oi8gICAgXDo6OlwgICAgXCAgICAgLzo6Oi8gICAgLyBcOjo6XCAgICBcICAKICAvOjo6LyAgfDo6fF9fX3xfX19fX18gICAgX19fXyAgICAvOjo6Ojo6XCAgICBcICAgIC86OjovICB8Ojp8ICAgfCBfX19fXyAgICAvOjo6LyAgICAvIFw6OjpcICAgIFwgICAvOjo6L19fX18vICAgXDo6OlxfX19fXCAKIC86OjovICAgfDo6Ojo6Ojo6XCAgICBcICAvXCAgIFwgIC86OjovXDo6OlwgICAgXCAgLzo6Oi8gICB8Ojp8ICAgfC9cICAgIFwgIC86OjovICAgIC8gICBcOjo6XCAgICBcIHw6Ojp8ICAgIHwgICAgIHw6Ojp8ICAgIHwKLzo6Oi8gICAgfDo6Ojo6Ojo6OlxfX19fXC86OlwgICBcLzo6Oi8gIFw6OjpcX19fX1wvOjogLyAgICB8Ojp8ICAgLzo6XF9fX19cLzo6Oi9fX19fLyAgICAgXDo6OlxfX19fXHw6Ojp8X19fX3wgICAgIHw6Ojp8ICAgIHwKXDo6LyAgICAvIH5+fn5+Lzo6Oi8gICAgL1w6OjpcICAvOjo6LyAgICBcOjovICAgIC9cOjovICAgIC98Ojp8ICAvOjo6LyAgICAvXDo6OlwgICAgXCAgICAgIFw6Oi8gICAgLyBcOjo6XCAgICBcICAgLzo6Oi8gICAgLyAKIFwvX19fXy8gICAgICAvOjo6LyAgICAvICBcOjo6XC86OjovICAgIC8gXC9fX19fLyAgXC9fX19fLyB8Ojp8IC86OjovICAgIC8gIFw6OjpcICAgIFwgICAgICBcL19fX18vICAgXDo6OlwgICAgXCAvOjo6LyAgICAvICAKICAgICAgICAgICAgIC86OjovICAgIC8gICAgXDo6Ojo6Oi8gICAgLyAgICAgICAgICAgICAgICAgICB8Ojp8Lzo6Oi8gICAgLyAgICBcOjo6XCAgICBcICAgICAgICAgICAgICAgIFw6OjpcICAgIC86OjovICAgIC8gICAKICAgICAgICAgICAgLzo6Oi8gICAgLyAgICAgIFw6Ojo6L19fX18vICAgICAgICAgICAgICAgICAgICB8Ojo6Ojo6LyAgICAvICAgICAgXDo6OlwgICAgXCAgICAgICAgICAgICAgICBcOjo6XF9fLzo6Oi8gICAgLyAgICAKICAgICAgICAgICAvOjo6LyAgICAvICAgICAgICBcOjo6XCAgICBcICAgICAgICAgICAgICAgICAgICB8Ojo6OjovICAgIC8gICAgICAgIFw6OjpcICAgIFwgICAgICAgICAgICAgICAgXDo6Ojo6Ojo6LyAgICAvICAgICAKICAgICAgICAgIC86OjovICAgIC8gICAgICAgICAgXDo6OlwgICAgXCAgICAgICAgICAgICAgICAgICB8Ojo6Oi8gICAgLyAgICAgICAgICBcOjo6XCAgICBcICAgICAgICAgICAgICAgIFw6Ojo6OjovICAgIC8gICAgICAKICAgICAgICAgLzo6Oi8gICAgLyAgICAgICAgICAgIFw6OjpcICAgIFwgICAgICAgICAgICAgICAgICAvOjo6LyAgICAvICAgICAgICAgICAgXDo6OlwgICAgXCAgICAgICAgICAgICAgICBcOjo6Oi8gICAgLyAgICAgICAKICAgICAgICAvOjo6LyAgICAvICAgICAgICAgICAgICBcOjo6XF9fX19cICAgICAgICAgICAgICAgIC86OjovICAgIC8gICAgICAgICAgICAgIFw6OjpcX19fX1wgICAgICAgICAgICAgICAgXDo6L19fX18vICAgICAgICAKICAgICAgICBcOjovICAgIC8gICAgICAgICAgICAgICAgXDo6LyAgICAvICAgICAgICAgICAgICAgIFw6Oi8gICAgLyAgICAgICAgICAgICAgICBcOjovICAgIC8gICAgICAgICAgICAgICAgIH5+ICAgICAgICAgICAgICAKICAgICAgICAgXC9fX19fLyAgICAgICAgICAgICAgICAgIFwvX19fXy8gICAgICAgICAgICAgICAgICBcL19fX18vICAgICAgICAgICAgICAgICAgXC9fX19fLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA=';
const minco = atob(minco_b64);

export default function Terminal() {
	const [editable, setEditable] = React.useState(true)
	const [screens, setScreens] = React.useState<React.ReactNode>(<></>)
	const ttRef = React.useRef<HTMLDivElement>(null)
	const inputRef = React.useRef<HTMLInputElement>(null)
	const canvasRef = React.useRef<HTMLCanvasElement>(null)
	const screenList: React.ReactNode[] = []

	let text = '';
	let content = ''
	const historyArr: (string|React.ReactNode)[] = []
	const [historyState, setHistoryState] = React.useState(<></>)
	const [contentState, setContentState] = React.useState('')
	const [prog, setProg] = React.useState('+'.repeat(20));
	let lastEventTime = 0;

	function handleKey(e: React.KeyboardEvent<HTMLDivElement>) {
		if (!editable) return;
		if (Date.now() - lastEventTime < 50) return;
		lastEventTime = Date.now();
		if (e.key === 'Enter') {
			execute();
		} else if (e.key === 'Backspace') {
			if (content.trim() == '$') return;
			setContent(content.slice(0, -1))
			text = text.slice(0, -1)
		} else if (e.key.length == 1) {
			setContent(content + e.key)
			text += e.key
		}
		setTimeout(() => {
			ttRef.current?.scrollTo(0, ttRef.current?.scrollHeight)
		}, 50);
	}

	async function execute() {
		setEditable(false)
		addHistory(content)
		const t = text.trim()
		text = ''
		if (t == 'start') {
			addHistory(minco);
			addHistory(<>
				Hello! I&apos;m <Blue>minco</Blue>. I am a full stack developer.
				<br />
				Execute <Green>help</Green> to get more information.
			</>)
		} else if (t == 'help') {
			addHistory(<>
				Commands:
				<br />
				<ul>
					<li><Green>start</Green>: Start.</li>
					<li><Green>help</Green>: Show this help.</li>
					<li><Green>logo</Green>: Show the logo.</li>
					<li><Green>projects</Green>: Show my projects.</li>
					<li><Green>contact</Green>: Show my contacts.</li>
					<li><Green>skills</Green>: Show my skills.</li>
					<li><Green>info</Green>: Show the <Blue>minco</Blue>&apos;s personal information.</li>
				</ul>
			</>)
		} else if (t == 'logo') {
			addHistory("Logo isn't implemented yet. Instead, showing the default react logo.")
			addHistory(<>
				<img src="/logo192.png" alt="logo" width="100" height="100" />
			</>);
		} else if (t == 'projects') {
			addHistory(<>
				<ul>
					<li><a target="_blank" rel="noreferrer" href="https://github.com/MincoMK/PrimeFinder">PrimeFinder</a>: Prime number finder</li>
				</ul>
			</>);
		} else if (t == "skills") {
			addHistory(<>
				<b>Frontend</b>
				<ul>
					<li>HTML/CSS</li>
					<li>JS/TS</li>
					<li>React</li>
					<li>Next.js</li>
					<li>React Native</li>
					<li>LVGL</li>
					<li>Qt</li>
				</ul>
				<b>Backend</b>
				<ul>
					<li>Node.js</li>
					<li>Express</li>
					<li>Django</li>
					<li>Flask</li>
					<li>Ktor</li>
					<li>Spring</li>
				</ul>
				<b>Data Science</b>
				<ul>
					<li>Python</li>
					<li>MongoDB</li>
					<li>MySQL</li>
					<li>PostgreSQL</li>
					<li>Redis</li>
					<li>TensorFlow</li>
					<li>PyTorch</li>
				</ul>
				<b>System/Security</b>
				<ul>
					<li>C/C++</li>
					<li>Embedded Linux / Linux</li>
					<li>Assembly</li>
					<li>Reverse Engineering</li>
					<li>Binary Exploitation</li>
					<li>Web Exploitation</li>
					<li>Forensics</li>
					<li>Network</li>
				</ul>
			</>)
		} else if (t == 'contact') {
			addHistory(<>
				<ul>
					<li><a target="_blank" rel="noreferrer" href="https://discordapp.com/users/590826711147347973">Discord</a>: mincomk</li>
					<li><a target="_blank" rel="noreferrer" href="https://github.com/MincoMK">GitHub</a>: MincoMK</li>
				</ul>
			</>)
		} else if (t == 'info') {
			addHistory(<>
				<ul>
					<li>Name: <Blue>Minco</Blue></li>
					<li>Birth: 2008.12.04</li>
					<li>Region: Busan, South Korea</li>
					<li>Job: Student</li>
				</ul>
			</>)
		} else {
			addHistory(<>
				<Red>{t}</Red>: command not found.
				Execute <Green>help</Green> to get help.
			</>)
		}
		setContent('$ ')
		setEditable(true)
		console.log(ttRef.current);
		setTimeout(() => {
			ttRef.current?.scrollTo(0, ttRef.current?.scrollHeight)
		}, 50);
	}

	function setContent(conte: string) {
		setContentState(conte)
		content = conte;
	}

	function addHistory(hist: string | React.ReactNode) {
		historyArr.push(hist)
		reloadHistory();
	}

	function popHistory() {
		historyArr.pop()
		reloadHistory();
	}

	function reloadHistory(): void {
		let history = <></>
		for (const h of historyArr) {
			history = <>{history}{h}<br /></>
		}
		setHistoryState(history)
	}

	useEffect(() => {
		document.addEventListener('keydown', e => handleKey(e as any))
		addHistory(<>
			Execute <Green>start</Green> to start.
		</>)
		setContent('$ ');
	}, []);

	function addScreen(screen: React.ReactNode) {
		screenList.push(screen)
		reloadScreen()
	}

	function reloadScreen() {
		let sc = <></>
		for (const s of screenList) {
			sc = <>{sc}{s}</>
		}
		setScreens(sc)
	}
	
	const BlinkingCursor = styled.span`
		animation: blink 1s infinite;
		width: 3px;
		height: 8px;
		background-color: #fff;
		display: inline-block;
		vertical-align: middle;
		margin-left: 2px;
		@keyframes blink {
			0% {
				opacity: 1;
			}
			50% {
				opacity: 0;
			}
			100% {
				opacity: 1;
			}
		}
	`

	function handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
		inputRef.current!.focus()
	}

	return (
		<TerminalContainer>
			<MobileInput ref={inputRef} />
			<TerminalText ref={ttRef} onClick={handleClick}>
				{historyState}
				{contentState}
				{editable && <BlinkingCursor />}
				{screens}
			</TerminalText>
		</TerminalContainer>
	)
}

function sleep(ms: number) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

