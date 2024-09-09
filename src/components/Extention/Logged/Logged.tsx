export const Logged = () => {
	return (
		<>
			<div className='logged logged_hidden'>
				<div className='logged__top'>
					<p className='logged__user'>Пользователь:</p>
					<button className='logged__login'>#####</button>
				</div>
				<div className='logged__bottom'>
					<button className='logged__button'>Выйти</button>
				</div>
			</div>
			<div className='account account_hidden'>
				<input className='account__fio' value='#. #. #####' />
			</div>
			<p className='server-error'>#####</p>
		</>
	);
};
