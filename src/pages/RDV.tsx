import { FormEvent, useState } from 'react'
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
import i18next from 'i18next'
import { isFormValid } from '../utils/rdv'
import {
  BoolChoice,
  FIRST_TIME,
  FRIDAY,
  LANGUAGES,
  MONDAY,
  STYLES,
  THURSDAY,
  TUESDAY,
  WEDNESDAY
} from '../constants/rdv'

interface EvilForm {
  firstName?: string,
  lastName?: string,
  email?: string,
  languageEn?: boolean,
  flash?: string,
  descProj?: string,
  placement?: string,
  size?: string,
  styleBlack?: boolean,
  styleBc?: boolean,
  styleColor?: boolean,
  styleGradient?: boolean,
  styleMulticolor?: boolean,
  'monday-13'?: boolean,
  'monday-11'?: boolean,
  'monday-15'?: boolean,
  'tuesday-13'?: boolean,
  'tuesday-11'?: boolean,
  'tuesday-15'?: boolean,
  'wednesday-13'?: boolean,
  'wednesday-11'?: boolean,
  'wednesday-15'?: boolean,
  'thursday-13'?: boolean,
  'thursday-11'?: boolean,
  'thursday-15'?: boolean,
  'friday-13'?: boolean,
  'friday-11'?: boolean,
  'friday-15'?: boolean,
  reference?: string,
  firstTimeNo?: boolean,
  firstTimeyYes?: boolean,
  questions?: string,
  over18?: boolean,
  covidProof?: boolean,
  trueInfo?: boolean
}

const RDV = () => {
  const { t } = useTranslation()
  const navigate = useNavigate();
  const [form, setForm] = useState<any>({})
  const isMobile = window.innerWidth < 500;

  const handleFormChange = (event: FormEvent) => {
    setForm(
      {
        ...form,
        [(event.target as HTMLInputElement).id]:
          (event.target as HTMLInputElement).value === 'on'
            ?
            (event.target as HTMLInputElement).checked :
            (event.target as HTMLInputElement).value
      })
  }

  const sendForm = () => {
    const tmpForm: any = { ...form };
    Object.keys(form).forEach((info: string) => {
      if (form[info]) {
        tmpForm[info] = form[info]
      }
    })
    if (process.env.NODE_ENV === 'production') {
      emailjs.send(
        SECRETS.SERVICE_ID,
        SECRETS.TEMPLATE_ID,
        form,
        SECRETS.USER_ID)
        .then(() => alert(t('form.alert')))
        .then(() => navigate('/'))
    } else {
      console.log(form)
    }
  }

  const [openedAvailabilities, setOpenedAvailabilities] = useState<any[]>([{}])

  const [monday, setMonday] = useState<BoolChoice[]>(MONDAY)
  const [tuesday, setTuesday] = useState<any>(TUESDAY)
  const [wednesday, setWednesday] = useState<any>(WEDNESDAY)
  const [thursday, setThursday] = useState<any>(THURSDAY)
  const [friday, setFriday] = useState<any>(FRIDAY)
  const [languages, setLanguages] = useState<any>(LANGUAGES)
  const [styles, setStyles] = useState<any>(STYLES)
  const [firstTime, setFirstTime] = useState<any>(FIRST_TIME)

  return (
    <div className='rdv container'
      onChange={e => handleFormChange(e)}>
      <section className='rdv'>
        <EvilHeader />
        <div className='text'>
          <p className='title-text'>{t('general.form')} {isMobile && <br />} {t('general.april')}/{t('general.march')}</p>
          {i18next.language === 'fr' ? <h3 className='title-header'>DEMANDE POUR <br />UN
            <span className='blue'> RENDEZ-VOUS</span></h3> : <h3 className='title-header'>BOOKING
            <span className='blue'> FORM</span></h3>}
          <p className='paragraph'>
            {t('form.text1')}
            <br /><br />
            {t('form.text2')}<strong>{t('form.text3')}</strong> {t('form.text4')}<strong>{t('form.text5')}</strong>
            {t('form.text6')}<strong>{t('form.text7')}</strong> {t('form.text8')} <strong>{t('form.text9')}</strong>.
            <br /><br />
            <strong >{t('form.text10')}</strong>
            <br /><br />
            {t('form.text11')}
          </p>
          <p className='paragraph special'> {t('form.text12')}</p>
        </div>

        <CustomTitle
          label={t('form.contact')}
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
          label='Flash'
          subLabel={t('form.subFlash')} />
        <CustomTextArea
          id='descProj'
          label={t('form.projDescription')}
        />
        <CustomInput
          id='placement'
          label={t('form.placement')}
          subLabel={t('form.placement-notes')}
          isRequired />
        <CustomInput
          id='size'
          label={t('form.size')}
          subLabel={t('form.sizeUnit')}
          isRequired />
        <CustomMultiChoice
          id='style'
          label={t('form.styles')}
          choices={styles}
          setChoices={setStyles} />
        <br />
        <CustomInput
          id='availabilities'
          label={t('form.availabilities')}
          hide
          isRequired />
        <CustomAvailabilities
          id='mon'
          label={t('form.monday')}
          isDisabled
          choices={monday}
          color='rgba(193,131,255,0.19)'
          arrowColor='rgba(193,131,255,1)'
          setDay={setMonday}
          openedAvailabilities={openedAvailabilities}
          setOpenedAvailabilities={setOpenedAvailabilities} />
        <CustomAvailabilities
          id='tue'
          label={t('form.tuesday')}
          isDisabled
          choices={tuesday}
          color='rgba(250,165,0,0.23)'
          arrowColor='rgba(250,165,0,1)'
          setDay={setTuesday}
          openedAvailabilities={openedAvailabilities}
          setOpenedAvailabilities={setOpenedAvailabilities} />
        <CustomAvailabilities
          id='wed'
          label={t('form.wednesday')}
          choices={wednesday}
          color='rgba(250,103,144,0.35)'
          arrowColor='rgba(250,103,144,1)'
          setDay={setWednesday}
          openedAvailabilities={openedAvailabilities}
          setOpenedAvailabilities={setOpenedAvailabilities} />
        <CustomAvailabilities
          id='thu'
          label={t('form.thursday')}
          choices={thursday}
          color='rgba(200,235,255,1)'
          arrowColor='rgba(6,159,246,1)'
          setDay={setThursday}
          openedAvailabilities={openedAvailabilities}
          setOpenedAvailabilities={setOpenedAvailabilities} />
        <CustomAvailabilities
          id='fri'
          label={t('form.friday')}
          choices={friday}
          color='rgba(43,215,197,0.24)'
          arrowColor='rgba(43,215,197,1)'
          setDay={setFriday}
          openedAvailabilities={openedAvailabilities}
          setOpenedAvailabilities={setOpenedAvailabilities} />
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
        <CustomCheckBox
          id='over18'
          label={t('form.over18')}
          isRequired />
        <CustomCheckBox
          id='covidProof'
          label={t('form.wellVaccinated')}
          isRequired />
        <CustomCheckBox
          id='trueInfo'
          label={t('form.valideInfo')}
          isRequired />
        <button
          className={`${isFormValid(form)}`}
          onClick={sendForm}>
          {t('form.send')}
        </button>
      </section>

    </div>
  )
};
export default RDV