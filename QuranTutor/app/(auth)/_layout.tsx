import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="splash" 
                    options={{headerShown: false,}}
      />
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="Search" />
      <Stack.Screen name="QuranPage" />
      <Stack.Screen name="profilePage" />
      <Stack.Screen name="DetailAyah" />


    </Stack>
  );
}



