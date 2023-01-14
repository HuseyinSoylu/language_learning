import React, { useState } from "react";
import { Stack, FAB } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

export default function Demo() {
  return (
    <Stack fill center spacing={4}>
      <FAB icon={(props) => <Icon name="plus" {...props} />} />
    </Stack>
  );
}
