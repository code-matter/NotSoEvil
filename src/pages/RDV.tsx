import React, { useState } from 'react'
import CustomInput from '../components/CustomInput'
import CustomMultiChoice from '../components/CustomMultiChoice'
import CustomTitle from '../components/CustomTitle'
import CustomTextArea from '../components/CustomTextArea'
import CustomCheckBox from '../components/CustomCheckBox'
import emailjs from '@emailjs/browser';
import CustomAvailabilities from '../components/CustomAvailabilities'
import { useNavigate } from 'react-router-dom'
import EvilHeader from '../components/EvilHeader'
import { SECRETS } from '../secrets'
import { useTranslation } from 'react-i18next'

export interface IForm {
  firstName: string,
  lastName: string,
  email: string,
}

const RDV = () => {
  const { t } = useTranslation()
  const navigate = useNavigate();
  const [form, setForm] = useState<any>({
  })
  const isMobile = window.innerWidth < 500;


  const handleFormChange = (event: any) => {
    // Deal with  true/false/'on'
    setForm({ ...form, [event.target.id]: event.target.value === 'on' ? event.target.checked : event.target.value })
  }

  const sendForm = () => {
    const tmpForm: any = {};
    Object.keys(form).forEach(info => {
      if (form[info]) {
        tmpForm[info] = form[info]
      }
    })
    if (process.env.NODE_ENV === 'production') {
      emailjs.send(SECRETS.SERVICE_ID, SECRETS.TEMPLATE_ID, form, SECRETS.USER_ID).then(() => alert(`
      YOUPII!! Ta demande de rendez-vous est belle et bien partie, assures-toi de vérifier tes courriels. À BIENTÔT !!
      `)).then(() => navigate('/'))
    }
  }

  const [openedAvailabilities, setOpenedAvailabilities] = useState<any[]>([{}])

  const [monday, setMonday] = useState<any>([{ id: 'monday-11', label: '11h', value: false }, { id: 'monday-14', label: '14h', value: false }])
  const [tuesday, setTuesday] = useState<any>([{ id: 'tuesday-11', label: '11h', value: false }, { id: 'tuesday-14', label: '14h', value: false }])
  const [wednesday, setWednesday] = useState<any>([{ id: 'wednesday-11', label: '11h', value: false }, { id: 'wednesday-14', label: '14h', value: false }])
  const [thursday, setThursday] = useState<any>([{ id: 'thursday-11', label: '11h', value: false }, { id: 'thursday-14', label: '14h', value: false }])
  const [friday, setFriday] = useState<any>([{ id: 'friday-11', label: '11h', value: false }, { id: 'friday-14', label: '14h', value: false }])

  const [languages, setLanguages] = useState<any>([{ id: 'languageFr', label: 'lang-fr', value: false }, { id: 'languageEn', label: 'lang-en', value: false }])
  const [styles, setStyles] = useState<any>([{ id: 'styleBlack', label: 'black', value: false }, { id: 'styleBc', label: 'blackWhite', value: false }, { id: 'styleColor', label: 'color', value: false }, { id: 'styleGradient', label: 'gradient', value: false }, { id: 'styleMulticolor', label: 'multicolore', value: false }])
  const [firstTime, setFirstTime] = useState<any>([{ id: 'firstTimeyYes', label: 'yes', value: false }, { id: 'firstTimeNo', label: 'no', value: false }])

  return (
    <div className='rdv container' onChange={e => handleFormChange(e)}>
      <section className='rdv'>
        <EvilHeader />
        <div className='text'>
          <p className='title-text'>{t('general.form')} {isMobile && <br />} {t('general.february')}/{t('general.march')}</p>
          <h3 className='title-header'>DEMANDE POUR <br />UN
            <span className='blue'> RENDEZ-VOUS</span></h3>
          <p className='paragraph'>
            Pour effectuer votre demande de rendez-vous, veuillez remplir le
            formulaire suivant le plus précisément possible. Pour plusieurs
            projets, veuillez remplir qu’un seul formulaire.
            <br /><br />
            Si votre projet est retenu, vous serez contacté par <strong>courriel</strong> afin
            d’établir la date de votre rendez-vous. <strong>Regardez vos pourriels !!! </strong>
            Afin de confirmer votre plage horaire, un <strong>dépôt de 50$</strong> vous sera
            demandé par <strong>virement interac</strong>.
            <br /><br />
            <strong >Le rendez-vous n’est pas confirmé tant que le dépôt ne sera pas envoyé!</strong>
            <br /><br />
            Merci merci pour votre intérêt envers mon art, sachez que c’est
            grandement apprécié.
          </p>
          <p className='paragraph special'> Au plaisir de créer avec vous!</p>
        </div>

        <CustomTitle label={t('form.contact')}
          color='#C183FF' />
        <CustomInput
          id='firstName'
          label={t('form.firstName')}
          isRequired />
        <CustomInput
          id='lastName'
          label={t('form.lastName')}
          isRequired />
        <CustomInput
          id='email'
          label={t('form.email')}
          isRequired />
        <CustomMultiChoice
          id='language'
          label={t('form.language')}
          isRequired
          choices={languages}
          setChoices={setLanguages} />
        <CustomTitle
          label={t('form.project')}
          color='#C183FF' />
        <CustomInput
          id='flash'
          subLabel={t('form.subFlash')}
          label='Flash' />
        <CustomTextArea
          id='descProj'
          label={t('form.projDescription')}
        />
        <CustomInput
          id='placement'
          label={t('form.placement')}
          isRequired
          subLabel={t('form.placement-notes')} />
        <CustomInput
          id='size'
          label={t('form.size')}
          isRequired
          subLabel={t('form.sizeUnit')} />
        <CustomMultiChoice
          id='style'
          label={t('form.styles')}
          choices={styles}
          setChoices={setStyles} />
        <CustomInput label={t('form.availabilities')} id='availabilities' isRequired hide />
        <CustomAvailabilities choices={monday} setDay={setMonday} id='mon' label={t('form.monday')} color='rgba(193,131,255,0.19)' arrowColor='rgba(193,131,255,1)' openedAvailabilities={openedAvailabilities} setOpenedAvailabilities={setOpenedAvailabilities} />
        <CustomAvailabilities choices={tuesday} setDay={setTuesday} id='tue' label={t('form.tuesday')} color='rgba(250,165,0,0.23)' arrowColor='rgba(250,165,0,1)' openedAvailabilities={openedAvailabilities} setOpenedAvailabilities={setOpenedAvailabilities} />
        <CustomAvailabilities choices={wednesday} setDay={setWednesday} id='wed' label={t('form.wednesday')} color='rgba(250,103,144,0.35)' arrowColor='rgba(250,103,144,1)' openedAvailabilities={openedAvailabilities} setOpenedAvailabilities={setOpenedAvailabilities} />
        <CustomAvailabilities choices={thursday} setDay={setThursday} id='thu' label={t('form.thursday')} color='rgba(200,235,255,1)' arrowColor='rgba(6,159,246,1)' openedAvailabilities={openedAvailabilities} setOpenedAvailabilities={setOpenedAvailabilities} />
        <CustomAvailabilities choices={friday} setDay={setFriday} id='fri' label={t('form.friday')} color='rgba(43,215,197,0.24)' arrowColor='rgba(43,215,197,1)' openedAvailabilities={openedAvailabilities} setOpenedAvailabilities={setOpenedAvailabilities} />
        <br />
        <CustomInput
          id='reference'
          label={t('form.refImage')}
          subLabel={t('form.refImage-notes')} />
        <CustomTitle
          label={t('form.moreInfo')}
          color='#C183FF' />
        <CustomMultiChoice
          id='firstTime'
          label={t('form.firstTime')}
          choices={firstTime}
          setChoices={setFirstTime} />
        <CustomTextArea
          id='questions'
          label={t('form.questions')}
          subLabel={t('form.questions-notes')} />
        <CustomCheckBox id='over18' label={t('form.over18')} isRequired />
        <CustomCheckBox id='covidProof' label={t('form.wellVaccinated')} isRequired />
        <CustomCheckBox id='trueInfo' label={t('form.valideInfo')} isRequired />
        <button className={`${form.firstName && form.lastName && form.email && (form.languageFr || form.languageEn) && form.placement && form.size && (
          form['monday-11'] || form['monday-14'] || form['tuesday-11'] || form['tuesday-14'] || form['wednesday-11'] || form['wednesday-14'] || form['thursday-11'] || form['thursday-14'] || form['friday-11'] || form['friday-14']
        ) && form.over18 && form.covidProof && form.trueInfo ? '' : 'disabled'
          }`} onClick={sendForm}  >{t('form.send')}</button>
      </section>

    </div>
  )
};
export default RDV