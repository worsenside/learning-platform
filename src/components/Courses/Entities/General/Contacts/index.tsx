import React from 'react'
import { Link } from 'UI'
import { LinkStyles, LinkTextStyles, LinkTypes } from 'UI/Link/types'
import vkIconSrc from 'components/Courses/Entities/Lessons/View/icons/vk.svg'
import instagramIconSrc from 'components/Courses/Entities/Lessons/View/icons/instagram.svg'
import telegramIconSrc from 'components/Courses/Entities/Lessons/View/icons/telegram.svg'
import whatsappIconSrc from 'components/Courses/Entities/Lessons/View/icons/whatsapp.svg'

import cl from './style.module.scss'

const Contacts = () => (
	<div className={cl.contactsInfo}>
		<h2>Связаться с автором</h2>
		<p>Все вопросы связанные с курсом - пишите на почту</p>
		<div className={cl.contacts}>
			<Link
				type={LinkTypes.TARGET_BLANK}
				href="mailto:addressmail@mail.ru"
				className={cl.contactsLink}
				styleTypes={[LinkTextStyles.UNDERLINE, LinkStyles.SECONDARY]}
			>
				addressmail@mail.ru
			</Link>
			<Link
				type={LinkTypes.TARGET_BLANK}
				href="tel:+7 (917) 345-78-90"
				className={cl.contactsLink}
				styleTypes={[LinkTextStyles.UNDERLINE, LinkStyles.SECONDARY]}
			>
				+7 (917) 345-78-90
			</Link>
		</div>
		<div className={cl.media}>
			<Link
				href="components/Courses/Entities/Lessons/View/index#1"
				type={LinkTypes.TARGET_BLANK}
				className={cl.mediaItem}
			>
				<img src={vkIconSrc} alt="social" />
			</Link>
			<Link
				href="components/Courses/Entities/Lessons/View/index#1"
				type={LinkTypes.TARGET_BLANK}
				className={cl.mediaItem}
			>
				<img src={instagramIconSrc} alt="social" />
			</Link>
			<Link
				href="components/Courses/Entities/Lessons/View/index#1"
				type={LinkTypes.TARGET_BLANK}
				className={cl.mediaItem}
			>
				<img src={telegramIconSrc} alt="social" />
			</Link>
			<Link
				href="components/Courses/Entities/Lessons/View/index#1"
				type={LinkTypes.TARGET_BLANK}
				className={cl.mediaItem}
			>
				<img src={whatsappIconSrc} alt="social" />
			</Link>
		</div>
	</div>
)

export default Contacts
