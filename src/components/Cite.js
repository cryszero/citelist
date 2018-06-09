import React from 'react';

function Cite (props) {
		return (
			<div className='cite'>
				<div className='cite__header'>
					<b>Категория: {props.info.category}</b>
					<button
						onClick={() => props.onEdit()}
						className='cite__button'>Редактировать</button>
					<button
						onClick={() => props.onDelete()}
						className='cite__button'>Удалить</button>
				</div>
				<div className='cite__text'>{props.info.text}</div>
				<div className='cite__details'>{props.info.author}, {props.info.date}</div>
			</div>
		);
}

export default Cite;