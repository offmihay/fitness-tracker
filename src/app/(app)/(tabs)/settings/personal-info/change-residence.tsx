import { StyleSheet, View } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import clerkTransformData from "@/src/utils/clerkTransformData";
import { useUpdateUserMutation } from "@/src/queries/user";
import { useRouter } from "expo-router";
import LayoutStatic from "@/src/components/navigation/layouts/LayoutStatic";
import { useToast } from "@/src/hooks/useToast";
import GoogleAutoComplete, {
  PlaceObject,
} from "@/src/components/tournaments/choose-location/GoogleAutocomplete";
import { useManualLoading } from "@/src/hooks/useLoading";

const ChangeNameScreen = () => {
  useManualLoading(true);
  const { user } = useUser();
  const formDataMutation = useUpdateUserMutation();
  const router = useRouter();
  const { showSuccessToast } = useToast();

  const handleSelect = (data: PlaceObject) => {
    const residencePlace = {
      geoCoordinates: {
        latitude: isNaN(Number(data.latitude)) ? 0 : Number(data.latitude),
        longitude: isNaN(Number(data.longitude)) ? 0 : Number(data.longitude),
      },
      city: data.address,
    };
    if (
      user?.unsafeMetadata.residencePlace?.geoCoordinates?.longitude ===
        residencePlace.geoCoordinates.longitude &&
      user?.unsafeMetadata.residencePlace?.geoCoordinates?.latitude ===
        residencePlace.geoCoordinates.latitude
    ) {
      router.back();
    }
    const formData = clerkTransformData({ residencePlace }, user?.unsafeMetadata || null);
    formDataMutation.mutate(formData, {
      onSuccess: () => {
        showSuccessToast("user_information_updated");
        router.back();
      },
    });
  };

  return (
    <>
      <LayoutStatic name="changeResidence" isDefaultCompressed>
        <View style={styles.wrapper}>
          <View style={styles.autoCompleteSection}>
            <GoogleAutoComplete
              onSubmit={handleSelect}
              query={{ type: "(cities)" }}
              maxRows={4}
              location={{
                address: user?.unsafeMetadata.residencePlace?.city || "",
                latitude: user?.unsafeMetadata.residencePlace?.geoCoordinates?.latitude?.toString(),
                longitude:
                  user?.unsafeMetadata.residencePlace?.geoCoordinates?.longitude?.toString(),
              }}
            />
          </View>
        </View>
      </LayoutStatic>
    </>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    paddingTop: 10,
    paddingBottom: 120,
    paddingHorizontal: 20,
  },

  wrapper: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  autoCompleteSection: {
    width: "100%",
    height: 350,
    // borderWidth: 1,
    // borderColor: "red",
  },
});

export default ChangeNameScreen;
