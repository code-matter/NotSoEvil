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

export interface IForm {
  firstName: string,
  lastName: string,
  email: string,
}

const RDV = () => {
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
      emailjs.send(process.env.SERVICE_ID as string, process.env.TEMPLATE_ID as string, form, process.env.USER_ID as string).then(() => alert(`
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

  const [languages, setLanguages] = useState<any>([{ id: 'languageFr', label: 'Français', value: false }, { id: 'languageEn', label: 'Anglais', value: false }])
  const [styles, setStyles] = useState<any>([{ id: 'styleBlack', label: 'Noir', value: false }, { id: 'styleBc', label: 'Noir & Couleur', value: false }, { id: 'styleColor', label: 'Couleur', value: false }, { id: 'styleGradient', label: 'Dégradé', value: false }, { id: 'styleMulticolor', label: 'Multicolore', value: false }])
  const [firstTime, setFirstTime] = useState<any>([{ id: 'firstTimeyYes', label: 'Oui', value: false }, { id: 'firstTimeNo', label: 'Non', value: false }])

  return (
    <div className='rdv container' onChange={e => handleFormChange(e)}>
      <EvilHeader />
      <div className='text'>
        <p className='title-text'>FORMULAIRE {isMobile && <br />} FÉVRIER/MARS</p>
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

      <CustomTitle label='Contact'
        color='#C183FF' />
      <CustomInput
        id='firstName'
        label='Prénom'
        isRequired />
      <CustomInput
        id='lastName'
        label='Nom'
        isRequired />
      <CustomInput
        id='email'
        label='Courriel'
        isRequired />
      <CustomMultiChoice
        id='language'
        label="Langue(s)"
        isRequired
        choices={languages}
        setChoices={setLanguages} />
      <CustomTitle
        label='Projet'
        color='#C183FF' />
      <CustomInput
        id='flash'
        subLabel='Numéro(s) du ou des flashs'
        label='Flash' />
      <CustomTextArea
        id='descProj'
        label='Description du projet'
      />
      <CustomInput
        id='placement'
        label='Emplacement'
        isRequired
        subLabel="Prendre note que je ne tattoo pas les emplacements suivants : sternum, colonne vertébrale, nuque/cou, oreilles/derrière d’oreilles, doigts et pieds." />
      <CustomInput
        id='size'
        label='Taille Approximative'
        isRequired
        subLabel='En centimètre' />
      <CustomMultiChoice
        id='style'
        label="Style(s)"
        choices={styles}
        setChoices={setStyles} />
      <CustomInput label='Disponibilité(s)' id='availabilities' isRequired hide />
      <CustomAvailabilities choices={monday} setDay={setMonday} id='mon' label="Lundi" color='rgba(193,131,255,0.19)' arrowColor='rgba(193,131,255,1)' openedAvailabilities={openedAvailabilities} setOpenedAvailabilities={setOpenedAvailabilities} />
      <CustomAvailabilities choices={tuesday} setDay={setTuesday} id='tue' label="Mardi" color='rgba(250,165,0,0.23)' arrowColor='rgba(250,165,0,1)' openedAvailabilities={openedAvailabilities} setOpenedAvailabilities={setOpenedAvailabilities} />
      <CustomAvailabilities choices={wednesday} setDay={setWednesday} id='wed' label="Mercredi" color='rgba(250,103,144,0.35)' arrowColor='rgba(250,103,144,1)' openedAvailabilities={openedAvailabilities} setOpenedAvailabilities={setOpenedAvailabilities} />
      <CustomAvailabilities choices={thursday} setDay={setThursday} id='thu' label="Jeudi" color='rgba(200,235,255,1)' arrowColor='rgba(6,159,246,1)' openedAvailabilities={openedAvailabilities} setOpenedAvailabilities={setOpenedAvailabilities} />
      <CustomAvailabilities choices={friday} setDay={setFriday} id='fri' label="Vendredi" color='rgba(43,215,197,0.24)' arrowColor='rgba(43,215,197,1)' openedAvailabilities={openedAvailabilities} setOpenedAvailabilities={setOpenedAvailabilities} />
      <br />
      <CustomInput
        id='reference'
        label='Image de référence'
        subLabel='Vous pouvez joindre le lien vers une image de références juste ici. Vous pourrez m’envoyer des images supplémentaires par courriel une fois que j’aurais répondu à votre demande.' />
      <CustomTitle
        label='INFORMATIONS ADDITIONNELLES'
        color='#C183FF' />
      <CustomMultiChoice
        id='firstTime'
        label={`EST-CE TON PREMIER  TATTOO AVEC MOI?`}
        choices={firstTime}
        setChoices={setFirstTime} />
      <CustomTextArea
        id='questions'
        label='DES QUESTIONS ?'
        subLabel="Hésite pas si tu as des questionnements par rapport à ton projet, la prise de rendez-vous, etc." />
      <CustomCheckBox id='over18' label="J’ai plus de 18 ans" isRequired />
      <CustomCheckBox id='covidProof' label="Je certifie que je serai vacciné adéquatement en date de mon rendez-vous." isRequired />
      <CustomCheckBox id='trueInfo' label="Je certifie que les informations fournies dans les formulaires ci-joint sont justes." isRequired />
      <button className={`${form.firstName && form.lastName && form.email && (form.languageFr || form.languageEn) && form.placement && form.size && (
        form['monday-11'] || form['monday-14'] || form['tuesday-11'] || form['tuesday-14'] || form['wednesday-11'] || form['wednesday-14'] || form['thursday-11'] || form['thursday-14'] || form['friday-11'] || form['friday-14']
      ) && form.over18 && form.covidProof && form.trueInfo ? '' : 'disabled'
        }`} onClick={sendForm}  >J’ENVOIE MA DEMANDE YOUPII</button>
    </div>
  )
};
export default RDV