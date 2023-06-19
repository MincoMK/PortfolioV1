import React from 'react'
import styled from 'styled-components'


export default function Screen({ children, width, height }: { children: React.ReactNode, width?: number, height?: number}) {
	const [xS, setXS] = React.useState<number>(0)
	const [yS, setYS] = React.useState<number>(0)
	const [open, setOpen] = React.useState<boolean>(true)
	const headerRef = React.useRef<HTMLDivElement>(null)
	let firstHeaderX = 0;
	let firstHeaderY = 0;
	let firstX = 0;
	let firstY = 0;
	let moving = false;

	const cw = width || 800;
	const ch = height || 600;

	const ScreenMain = styled.div`
	position: absolute;
	display: ${open ? 'block' : 'none'};
	top: ${window.innerHeight / 2 + yS - ch / 2}px;
	left: ${window.innerWidth / 2 + xS - cw / 2}px;
	background:#4b4d57;
	border: 1.5px solid #575966;
	border-radius: 15px;
	width: ${width ? width : 800}px;
	height: ${height ? height : 600}px;
	color: #fff;
	z-index: 1;
	`

	const ScreenHeader = styled.div`
	border-radius: 15px 15px 0 0;
	border-bottom: 1.5px solid #575966;
	height: 30px;
	`

	const CloseBtn = styled.div`
	background: #ff5f56;
	border-radius: 50%;
	width: 10px;
	height: 10px;
	margin: 10px;
	float: left;
	&:hover {
		background: #ff7b72;
	}
	`

	function mouseDownHandler(e: React.MouseEvent) {
		firstX = e.clientX;
		firstY = e.clientY;
		firstHeaderX = headerRef.current!.offsetLeft;
		firstHeaderY = headerRef.current!.offsetTop;
		moving = true;
	}

	function mouseUpHandler(e: React.MouseEvent) {
		moving = false;
		try {
			headerRef.current!.addEventListener('mousedown', e => mouseDownHandler(e as any));
		} catch (e) {
			//
		}
	}

	function mouseMoveHandler(e: React.MouseEvent) {
		if (moving) {
			e.preventDefault();
			const xMov = firstHeaderX + e.clientX - firstX;
			const yMov = firstHeaderY + e.clientY - firstY;
			const boxXi = window.innerWidth / 2 + xMov - cw / 2;
			const boxYi = window.innerHeight / 2 + yMov - ch / 2;
			const boxXf = boxXi + cw;
			const boxYf = boxYi + ch;
			if (boxXi > 0 && boxXf < window.innerWidth)
				setXS(xMov);
			if (boxYi > 0 && boxYf < window.innerHeight)
				setYS(yMov);
		}
	}

	React.useEffect(() => {
		document.addEventListener('mousemove', e => mouseMoveHandler(e as any));
		document.addEventListener('mouseup', e => mouseUpHandler(e as any));
	}, []);

	function close() {
		setOpen(false);
	}

	return (
		<ScreenMain>
			<ScreenHeader onMouseDown={mouseDownHandler} ref={headerRef}>
				<CloseBtn onClick={close} />
			</ScreenHeader>
			{children}
		</ScreenMain>
	)
}
