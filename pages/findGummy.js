import dynamic from 'next/dynamic'

setTimeout(() => {
  const canvas = document.querySelector('#canvas');
  const ctx = canvas.getContext('2d');
  let width = canvas.width;
  let height = canvas.height;

  const resolution = 1;
  const iterations = 100;
  let scale = localStorage.scale ? parseFloat(localStorage.scale) : 1;
  let offsetX = localStorage.offsetX ? parseFloat(localStorage.offsetX) : 0;
  let offsetY = localStorage.offsetY ? parseFloat(localStorage.offsetY) : 0;

  const targetX = -0.7483756164001534;
  const targetY = 0.12421394007469644;

  let won = false;

  const canvasWidth = document.querySelector('#canvasWidth');
  const canvasHeight = document.querySelector('#canvasHeight');
  const originX = document.querySelector('#originX');
  const originY = document.querySelector('#originY');
  const scaleText = document.querySelector('#scale');
  const showHint = document.querySelector('#hint');
  const wonMsg = document.querySelector('#wonMsg');

  const map = (x, min1, max1, min2, max2) => min2 + (x - min1) / (max1 - min1) * (max2 - min2);

  showHint.addEventListener('change', e => {
    updateUI();
  })

  const reset = () => {
    console.log('chal to rha hu')
    won = false;
    offsetX = 0;
    offsetY = 0;
    scale = 1;
    updateUI();
  }

  const showHeplMark = () => {
    let x = map(targetX, offsetX - 2 / scale, offsetX + 2 / scale, 0, width);
    let y = map(targetY, offsetY - 2 / scale, offsetY + 2 / scale, 0, height);
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2, false);
    ctx.fillStyle = '#fff';
    ctx.fill();
  }

  const checkWin = () => {
    if (!won) {
      if (offsetX == targetX && offsetY == targetY) {
        won = true;
        wonMsg.classList.remove('hidden');
      } else {
        wonMsg.classList.add('hidden');
      }
    }
  }

  const renderSize = size => {
    let proceed = true;
    if (size > 400) {
      proceed = confirm('Very resource intensive processing ahead! Sure to proceed?');
    }
    if (proceed) {
      canvas.width = size;
      canvas.height = size;
      width = size;
      height = size;
      updateUI();
    }
  }

  const draw = () => {
    console.log('first')
    for (let i = 0; i < width; i += resolution) {
      for (let j = 0; j < height; j += resolution) {

        let x = map(i, 0, width, offsetX - 2 / scale, offsetX + 2 / scale);
        let y = map(j, 0, height, offsetY - 2 / scale, offsetY + 2 / scale);
        let a = 0, b = 0;
        for (let k = 0; k < iterations; k++) {
          let temp = a;
          a = a * a - b * b + x;
          b = 2 * temp * b + y;
        }
        if (Math.sqrt(a * a + b * b) < 2) {
          ctx.fillStyle = `hsl(${Math.sqrt(a * a + b * b) * 360}, 100%, 50%)`;
        } else {
          ctx.fillStyle = '#2a293b';
        }

        ctx.beginPath();
        ctx.rect(i, j, i + resolution, j + resolution);
        ctx.fill();
      }
    }
  }

  const updateUI = () => {
    canvasWidth.innerText = width;
    canvasHeight.innerText = height;
    originX.innerText = offsetX;
    originY.innerText = -offsetY;
    scaleText.innerText = scale;

    draw();

    if (showHint.checked) {
      showHeplMark();
    }
    checkWin();

    localStorage.setItem('scale', scale);
    localStorage.setItem('offsetX', offsetX);
    localStorage.setItem('offsetY', offsetY);
  }
  updateUI();


  const zoomIn = () => scale *= 2;
  const zoomOut = () => scale /= 2;
  const goRight = () => offsetX += 1 / scale;
  const goLeft = () => offsetX -= 1 / scale;
  const goUp = () => offsetY -= 1 / scale;
  const goDown = () => offsetY += 1 / scale;


  window.addEventListener('keydown', (e) => {
    let refresh = true;

    // prevent scrolling
    if (e.key == ' ' || e.key == 'ArrowUp' || e.key == 'ArrowDown') {
      e.preventDefault();
    }

    if (e.key == ' ') {
      if (e.shiftKey) {
        zoomOut();
      } else {
        zoomIn();
      }
    } else if (e.key == 'ArrowUp' || e.key == 'w') {
      goUp();
    } else if (e.key == 'ArrowLeft' || e.key == 'a') {
      goLeft();
    } else if (e.key == 'ArrowDown' || e.key == 's') {
      goDown();
    } else if (e.key == 'ArrowRight' || e.key == 'd') {
      goRight();
    } else {
      refresh = false;
    }
    if (refresh) {
      updateUI();
    }
  })

  document.querySelector('#goUp').addEventListener('click', () => { goUp(); updateUI(); })
  document.querySelector('#goDown').addEventListener('click', () => { goDown(); updateUI(); })
  document.querySelector('#goLeft').addEventListener('click', () => { goLeft(); updateUI(); })
  document.querySelector('#goRight').addEventListener('click', () => { goRight(); updateUI(); })
  document.querySelector('#zoomIn').addEventListener('click', () => { zoomIn(); updateUI(); })
  document.querySelector('#zoomOut').addEventListener('click', () => { zoomOut(); updateUI(); })
  document.querySelector('#reset').addEventListener('click', () => reset())
  document.querySelector('#renderSize100').addEventListener('click', () => renderSize(100))
  document.querySelector('#renderSize200').addEventListener('click', () => renderSize(200))
  document.querySelector('#renderSize400').addEventListener('click', () => renderSize(400))
  document.querySelector('#renderSize800').addEventListener('click', () => renderSize(800))

}, 1000);

const FindGummy = () => {
  return (
    <div className="px-6 py-4 font-mono">

      <div className="space-y-6">
        <p className="font-montserrat text-lg md:text-2xl font-semibold">Try to reach the target using keyboard or on-screen buttons to find
          the gummy bear.</p>

        <canvas className="bg-slate-700 rounded-xl" id="canvas" width="200px" height="200px"></canvas>

        <div>
          <div className="max-w-md">
            <div className="grid grid-cols-6">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <button className="btn-outline p-4" id='goUp'>
                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                  <path
                    d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
                </svg>
              </button>
              <div></div>
            </div>

            <div className="grid grid-cols-6">
              <button className="btn-outline p-4" id='zoomIn'>
                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path
                    d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM184 296c0 13.3 10.7 24 24 24s24-10.7 24-24V232h64c13.3 0 24-10.7 24-24s-10.7-24-24-24H232V120c0-13.3-10.7-24-24-24s-24 10.7-24 24v64H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h64v64z" />
                </svg>
              </button>
              <button className="btn-outline p-4" id='zoomOut'>
                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path
                    d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM136 184c-13.3 0-24 10.7-24 24s10.7 24 24 24H280c13.3 0 24-10.7 24-24s-10.7-24-24-24H136z" />
                </svg>
              </button>
              <div></div>
              <button className="btn-outline p-4" id='goLeft'>
                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path
                    d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
                </svg>
              </button>
              <button className="btn-outline p-4" id='goDown'>
                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                  <path
                    d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                </svg>
              </button>
              <button className="btn-outline p-4" id='goRight'>
                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path
                    d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div>
          <p className="bg-pink-500 p-4 hidden rounded-xl text-white font-montserrat font-bold text-xl md:text-3xl" id="wonMsg">
            Yay! You made it.????
          </p>
        </div>

        <div className="flex flex-col md:flex-row flex-wrap space-y-1 md:space-x-8 md:items-end font-sm">
          <h3 className="text-3xl font-bold font-montserrat">Z<sub>n+1</sub> = Z<sub>n</sub><sup>2</sup> + c</h3>
          <a className="text-blue-600 hover:text-blue-700 underline" href="https://www.youtube.com/watch?v=NGMRB4O922I"
            target="_blank" rel="noreferrer">What&apos;s this?</a>
        </div>
        <div>
          <p>Origin: <span id="originX">0</span> + <span id="originY">0</span>i</p>
          <p>Target: -0.7483756164001534 + -0.12421394007469644i</p>
          <p>Scale: <span id="scale">1</span></p>
        </div>

        <button className="btn" id='reset'>Reset</button>
        <div>
          <div className='flex items-center'>
          <input className="transition-all" type="checkbox" name="hint" id="hint" />
          <label className='ml-2' htmlFor="hint">Make my life easier</label>
          </div>
          <p className="text-slate-500 text-xs">(Plots the target point on the map with a white dot to follow.)</p>
        </div>

        <div>
          <p>Render size: <span id="canvasWidth">200</span> x <span id="canvasHeight">200</span> px</p>
          <div className="flex flex-wrap">
            <button className="btn-1 mr-2 mb-2" id='renderSize100'>100x100</button>
            <button className="btn-2 mr-2 mb-2" id='renderSize200'>200x200</button>
            <button className="btn-3 mr-2 mb-2" id='renderSize400'>400x400</button>
            <button className="btn-4 mr-2 mb-2" id='renderSize800'>800x800</button>
          </div>
        </div>

        <table className="table-auto text-left border">
          <thead className='bg-slate-50'>
            <tr className="border-b">
              <th className="p-2 pr-6">Key</th>
              <th className="p-2 pr-6">Fucntion</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-2 pr-6">Space</td>
              <td className="p-2 pr-6">Zoom in</td>
            </tr>
            <tr className="border-b">
              <td className="p-2 pr-6">Shift + Space</td>
              <td className="p-2 pr-6">Zoom out</td>
            </tr>
            <tr className="border-b">
              <td className="p-2 pr-6">&UpArrow; / W</td>
              <td className="p-2 pr-6">Up</td>
            </tr>
            <tr className="border-b">
              <td className="p-2 pr-6">&LeftArrow; / A</td>
              <td className="p-2 pr-6">Left</td>
            </tr>
            <tr className="border-b">
              <td className="p-2 pr-6">&DownArrow; / S</td>
              <td className="p-2 pr-6">Down</td>
            </tr>
            <tr className="border-b">
              <td className="p-2 pr-6">&RightArrow; / D</td>
              <td className="p-2 pr-6">Right</td>
            </tr>
          </tbody>
        </table>


        <div>
          <p>An attempt to recreate an interactive Mandelbrot set:</p>
          <iframe className="w-full aspect-[1.77] max-w-[560px]" src="https://www.youtube.com/embed/pCpLWbHVNhk"
            title="YouTube video player" frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen></iframe>
        </div>
      </div>
    </div>
  )
}

export default dynamic(() => Promise.resolve(FindGummy), {
  ssr: false,
})
