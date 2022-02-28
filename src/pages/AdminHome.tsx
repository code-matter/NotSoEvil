import { UserContext } from "../context/UserContext"
import React, { FormEvent, useContext, useEffect, useRef, useState } from 'react';
import { UsersService } from "../services/users.services";
import { useNavigate } from "react-router-dom";
import Modal from "../UI/Modal";
import CustomInput from "../components/CustomInput";
import CustomMultiChoice from "../components/CustomMultiChoice";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { firebaseDB, firebaseStorage } from "../utils/firebase";
import { doc, setDoc } from "firebase/firestore";
import CustomSelect from "../components/CustomSelect";

export interface IAdminHome {

}

const AdminHome = ({ }: IAdminHome) => {
  const navigate = useNavigate()
  const userContext: any = useContext(UserContext)
  const [file, setFile] = useState<any>()
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState<any>({})

  useEffect(() => {
    const time = setTimeout(() => {
      if (!userContext) {
        navigate('/')
      }
    }, 500)
    return () => clearTimeout(time)
  }, [navigate, userContext])

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
  const getURL = async (where: any) => {
    const res = await getDownloadURL(ref(firebaseStorage, where))
    console.log('res ', res)
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
    console.log('tmpForm: ', tmpForm);
    if (file) {
      const storageRef = ref(firebaseStorage, `flashes/${form.name}`);
      await uploadBytes(storageRef, file)
      const imgUrl = await getURL(`flashes/${form.name}`)
      if (imgUrl) {
        console.log(imgUrl);
        await setDoc(doc(firebaseDB, "shop-flash", form.name), {
          name: form.name,
          type: form.type,
          price: form.price,
          image: imgUrl,
          rarity: form.rarity,
          size: form.size
        })
      }
    }
  }


  return (
    <div>
      {showModal && <Modal onClose={() => setShowModal(false)} backdropClose={false}>
        <form onSubmit={sendForm} onChange={handleFormChange}>
          <CustomInput id="name" label="Name" darkTheme />
          <CustomInput id="price" label="Price" />
          <CustomSelect darkTheme id="rarity" label="Rarity" selects={[{ id: 'unique', label: 'UNIQUE' }, { id: 'multiples', label: 'MULTIPLES' }]} />
          <CustomInput id="size" label="Size" />
          <CustomInput id="type" label="Type" />
          <input type="file" name="image" id="image" onChange={e => e.target.files && setFile(e.target.files[0])} />
          <button disabled={!form.name || !form.image}>SUBMIT</button>
        </form>
      </Modal>}

      HELLO {userContext?.email}

      <button onClick={() => setShowModal(true)}>Add Shop Item</button>

      <button
        type="button"
        onClick={() => UsersService.logout()}>LOG OUT
      </button>
      <button onClick={() => navigate('/shop')}>GO TO SHOP</button>
    </div>
  )
}

export default AdminHome