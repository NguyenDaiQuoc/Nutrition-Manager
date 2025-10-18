import React, { useRef, useState, useEffect } from 'react'
import { View, Button, Image, Alert, StyleSheet } from 'react-native'
import { Camera } from 'expo-camera'
import * as FileSystem from 'expo-file-system'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://xyz.supabase.co'
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'public-anon-key'
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export default function App() {
  const cameraRef = useRef(null)
  const [hasPerm, setHasPerm] = useState(null)
  const [photoUri, setPhotoUri] = useState(null)

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync()
      setHasPerm(status === 'granted')
    })()
  }, [])

  async function snap() {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.6 })
      setPhotoUri(photo.uri)
    }
  }

  async function upload() {
    if (!photoUri) return
    const b = await FileSystem.readAsStringAsync(photoUri, { encoding: FileSystem.EncodingType.Base64 })
    const fileName = `mobile_${Date.now()}.jpg`
    const { data, error } = await supabase.storage.from('meal-photos').upload(fileName, Buffer.from(b, 'base64'), { contentType: 'image/jpeg' })
    if (error) { Alert.alert('Upload error', error.message); return }
    const { data: urlData } = supabase.storage.from('meal-photos').getPublicUrl(data.path)
    // create meal + food item
    const mealResp = await supabase.from('meals').insert([{ type: 'unknown' }]).select().limit(1)
    const mealId = mealResp.data?.[0]?.id
    if (mealId) {
      await supabase.from('food_items').insert([{ meal_id: mealId, image_path: data.path }])
      await fetch('https://your-web-app.com/api/analyze-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl: urlData.publicUrl, mealId })
      })
      Alert.alert('Uploaded & analysis requested')
    }
  }

  if (hasPerm === null) return <View />
  if (hasPerm === false) return <View><Button title="Please enable camera"/></View>

  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 4 }} ref={cameraRef} />
      <Button title="Snap" onPress={snap} />
      {photoUri && <Image source={{ uri: photoUri }} style={{ width: 200, height: 200 }} />}
      <Button title="Upload" onPress={upload} />
    </View>
  )
}
