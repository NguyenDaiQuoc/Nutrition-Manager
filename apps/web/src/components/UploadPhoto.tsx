import React, { useRef, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import axios from 'axios'

export default function UploadPhoto() {
  const fileRef = useRef<HTMLInputElement|null>(null)
  const [preview, setPreview] = useState<string|null>(null)

  async function onSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setPreview(URL.createObjectURL(file))

    const fileName = `web_${Date.now()}_${file.name}`
    const { data, error } = await supabase.storage.from('meal-photos').upload(fileName, file)
    if (error) { alert(error.message); return }
    const { data: urlData } = await supabase.storage.from('meal-photos').getPublicUrl(data.path)

    // create meal + food_item in DB (simple)
    const mealResp = await supabase.from('meals').insert([{ type: 'unknown' }]).select().limit(1)
    const mealId = mealResp.data?.[0]?.id
    if (mealId) {
      await supabase.from('food_items').insert([{ meal_id: mealId, image_path: data.path }])
      // call server analyze
      await axios.post('/api/analyze-image', { imageUrl: urlData.publicUrl, mealId })
      alert('Uploaded & analysis requested')
    }
  }

  return (
    <div className="p-4 bg-white rounded shadow">
      <h3 className="font-medium mb-2">Upload meal photo</h3>
      <input ref={fileRef} type="file" accept="image/*" onChange={onSelect} />
      {preview && <img src={preview} alt="preview" className="mt-2 w-48 h-48 object-cover rounded" />}
    </div>
  )
}
