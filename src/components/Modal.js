import React from 'react';

export default function Modal(props) {
		if (props.isOpen === false)
			return null;

		const CustomValidation = () => { };
		CustomValidation.prototype = {
			invalidities: [],
			checkValidity: function(input) {
				const validity = input.validity;
				if(validity.patternMismatch) {
					this.addInvalidity('Поле должно иметь вид: ДД.ММ.ГГГГ');
				}
				if(validity.valueMissing) {
					this.addInvalidity('Поле не может быть пустым');
				}
			},
			addInvalidity: function(message) {
				this.invalidities.push(message);
			},
			getInvalidities: function() {
				return this.invalidities.join('. \n');
			}
		};

		const validationCheck = (release) => {
			const inputs = document.querySelectorAll('.modal__input');
			let result = false;
			inputs.forEach(input => {
				if (input.checkValidity() === false) {
      	const inputCustomValidation = new CustomValidation(); 
      	inputCustomValidation.checkValidity(input); 
      	const customValidityMessage = inputCustomValidation.getInvalidities();
      	input.setCustomValidity(customValidityMessage);
      		if(inputCustomValidation.invalidities.length === 0) {
      			result = true;
      		} else {
      			result = false;
      		}
    		}
			});
		};

		return (
			<div className='modal'>
				<form
				className='modal__content'
				onSubmit={(event) => {
						event.preventDefault();
						props.onSave()}}>
					<button
						className='modal__close'
						onClick={() => props.onClose()}></button>
					<label className='modal__label'>
						Категория: 
						<input
							name='category'
							required
							className='modal__input modal__category'
							placeholder='введите категорию'
							defaultValue={props.fields.category || ''}
							onChange={(e) => props.onChangeField(e)}/>
					</label>
					<textarea
						required
						name='text'
						className='modal__input modal__text'
						placeholder='введите текст цитаты'
						rows='5'
						defaultValue={props.fields.text  || ''}
						onChange={(e) => props.onChangeField(e)}/>
					<label className='modal__label'>
						Автор:
						<input
							required
							name='author'
							className='modal__input modal__author'
							placeholder='введите автора'
							defaultValue={props.fields.author  || ''}
							onChange={(e) => props.onChangeField(e)}/>
					</label>
					<label className='modal__label'>
						Дата:
						<input
							required
							name='date'
							className='modal__input modal__date' 
							placeholder='введите дату' 
							defaultValue={props.fields.date  || ''} 
							onChange={(e) => props.onChangeField(e)} 
							pattern='(0[1-9]|1[0-9]|2[0-9]|3[01]).(0[1-9]|1[012]).[0-9]{4}'/>
					</label>
					<button
						className='modal__save'
						onClick={event => validationCheck(props.onClick)}>Сохранить</button>
				</form>
			</div>
			);
}