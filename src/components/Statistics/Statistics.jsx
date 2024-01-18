import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Statistics.module.css';

const getRandomColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

const Statistics = ({ title, stats }) => {
  const [bgColors, setBgColors] = useState(new Array(stats.length).fill(''));
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newColors = [...bgColors];
      newColors[currentIndex] = getRandomColor();

      setCurrentIndex(currentIndex => (currentIndex + 1) % stats.length);
      setBgColors(newColors);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [currentIndex, stats.length, bgColors]);

  return (
    <section className={styles.statistics}>
      {title && <h2 className={styles.title}>{title}</h2>}

      <ul className={styles.statList}>
        {stats.map((stat, index) => (
          <li
            key={stat.id}
            className={styles.item}
            style={{ backgroundColor: bgColors[index] || getRandomColor() }}
          >
            <span className={styles.label}>{stat.label}</span>
            <span className={styles.percentage}>{stat.percentage}%</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

Statistics.propTypes = {
  title: PropTypes.string,
  stats: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      percentage: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default Statistics;