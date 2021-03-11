import React, { useEffect, useRef } from 'react';
import { G2, Line } from '@antv/g2plot'
import './App.css';
import data from './assets/bitcoin.json';

G2.registerShape('point', 'breath-point', {
  draw(cfg, container) {
    // const data = cfg.data;
    const point = { x: cfg.x, y: cfg.y };
    const group = container.addGroup();
    const decorator1 = group.addShape('circle', {
      attrs: {
        x: point.x,
        y: point.y,
        r: 10,
        fill: cfg.color,
        opacity: 0.5,
      },
    });
    const decorator2 = group.addShape('circle', {
      attrs: {
        x: point.x,
        y: point.y,
        r: 10,
        fill: cfg.color,
        opacity: 0.5,
      },
    });
    const decorator3 = group.addShape('circle', {
      attrs: {
        x: point.x,
        y: point.y,
        r: 10,
        fill: cfg.color,
        opacity: 0.5,
      },
    });
    decorator1.animate(
      {
        r: 20,
        opacity: 0,
      },
      {
        duration: 1800,
        easing: 'easeLinear',
        repeat: true,
      }
    );
    decorator2.animate(
      {
        r: 20,
        opacity: 0,
      },
      {
        duration: 1800,
        easing: 'easeLinear',
        repeat: true,
        delay: 600,
      }
    );
    decorator3.animate(
      {
        r: 20,
        opacity: 0,
      },
      {
        duration: 1800,
        easing: 'easeLinear',
        repeat: true,
        delay: 1200,
      }
    );
    group.addShape('circle', {
      attrs: {
        x: point.x,
        y: point.y,
        r: 6,
        fill: cfg.color,
        opacity: 0.7,
      },
    });
    group.addShape('circle', {
      attrs: {
        x: point.x,
        y: point.y,
        r: 1.5,
        fill: cfg.color,
      },
    });
    return group;
  },
});

function App() {
  const ref = useRef(null);
  const plot = useRef(null);
  const count = useRef(0);

  useEffect(() => {
    const config = {
      "title": {
        "visible": true,
        "text": "BitCoin"
      },
      "smooth": true,
      "description": {
        "visible": true,
        "text": "比特币十年走势一览"
      },
      "legend": {
        "flipPage": false
      },
      "forceFit": false,
      "width": 1099,
      "height": 562,
      "xField": "x",
      "yField": "y",
      "id": "line_chart",
      "color": [
        "#5B8FF9"
      ],
      "tooltip": {
        "title": '价格',
        formatter: (datum) => {
          return { name: datum.x, value: datum.y + '元' };
        },
      }
    }
    plot.current = new Line(ref.current, {
      data: [],
      ...config,
    });
    plot.current.render();
    
    window.setInterval(() => {
      if(count.current == data.length) {
        count.current = 0;
      }
      plot.current.changeData(data.slice(count.current, count.current + 30)); // 更新数据源
      count.current = count.current + 1;
    }, 100)
  }, [])

  return (
    <div className="App">
      <h2>BitCoin</h2>
      <p>比特币十年走势一览</p>
      <div className="Chart" ref={ref} />
    </div>
  );
}

export default App;
