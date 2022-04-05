import { UserContext } from "../context/UserContext"
import { FormEvent, useContext, useEffect, useState } from 'react';
import { UsersService } from "../services/users.services";
import { useNavigate } from "react-router-dom";
import Modal from "../components/UI/Modal";
import CustomInput from "../components/CustomInput";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { firebaseAuth, firebaseDB, firebaseStorage } from "../utils/firebase";
import { doc, setDoc } from "firebase/firestore";
import CustomSelect from "../components/CustomSelect";
import { ReactComponent as COUCOU } from '../assets/Smiley.svg'
import { onAuthStateChanged } from "firebase/auth";
import SquareButton from "../components/UI/SquareButton";

export interface IAdminHome {

}

const AdminHome = ({ }: IAdminHome) => {
  const navigate = useNavigate()
  const userContext: any = useContext(UserContext)
  const [file, setFile] = useState<any>()
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState<any>({})

  useEffect(() => {
    const onChangeUser = onAuthStateChanged(firebaseAuth, (user) => {
      if (!user) {
        navigate('/admin/login')
      }
    })
    return () => onChangeUser()
  }, [navigate])


  const handleFormChange = (event: FormEvent) => {
    // event.preventDefault()
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
  const getURL = async (where: any) => {
    const res = await getDownloadURL(ref(firebaseStorage, where))
    return res
  }

  const sendForm = async (e: any) => {
    e.preventDefault()
    const tmpForm: any = { ...form };
    Object.keys(form).forEach((info: string) => {
      if (form[info]) {
        tmpForm[info] = form[info]
      }
    })
    if (file) {
      const storageRef = ref(firebaseStorage, `items/${form.name}`);
      await uploadBytes(storageRef, file)
      const imgUrl = await getURL(`items/${form.name}`)
      if (imgUrl) {
        try {
          const d = await setDoc(doc(firebaseDB, "shop-items", form.name), {
            name: form.name,
            type: form.type,
            price: form.price,
            image: imgUrl,
            rarity: form.rarity || 'unique',
            size: form.size,
            color: form.color,
            category: form.category,
            available: true,
          })
          document.location.reload()
        } catch (error) {
          console.error(error)
        }
      }
    }
  }

  return (
    <div className="container" style={{ display: 'flex', flexDirection: 'column' }}>
      {showModal && <Modal
      >
        <div className='construction-modal add-items-modal'>
          <COUCOU onClick={() => setShowModal(false)} />
          <form onSubmit={sendForm} onChange={handleFormChange}>
            <CustomInput
              type="file"
              id="image"
              label="image"
              darkTheme
              onChange={e => e.target.files && setFile(e.target.files[0])} />
            <CustomInput
              id="name"
              label="Name"
              darkTheme />
            <CustomInput
              id="price"
              label="Price"
              darkTheme
              type="number" />
            <CustomSelect
              id="rarity"
              label="Rarity"
              darkTheme
              selects={
                [{ id: 'unique', label: 'UNIQUE' },
                { id: 'multiples', label: 'MULTIPLES' }]} />
            <CustomInput
              id="size"
              label="Size"
              darkTheme />
            <CustomInput
              id="type"
              label="Type"
              darkTheme />
            <CustomInput
              id="color"
              label="Color"
              darkTheme />
            <CustomInput
              id="category"
              label="Category"
              darkTheme />

            <SquareButton
              label="Add Item"
              type="submit"
              disabled={!form.name || !form.image} />
          </form>
        </div>
      </Modal>}

      HELLO {userContext?.state?.user?.email}

      <SquareButton label="Add Item" onClick={() => setShowModal(true)} />

      <button
        type="button"
        onClick={() => UsersService.logout()}>LOG OUT
      </button>
      <button onClick={() => navigate('/shop')}>GO TO SHOP</button>
    </div>
  )
}

export default AdminHome