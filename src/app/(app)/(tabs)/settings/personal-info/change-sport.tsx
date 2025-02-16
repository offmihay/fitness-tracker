import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import { useTranslation } from "react-i18next";
import clerkTransformData from "@/src/utils/clerkTransformData";
import { useUpdateUserMutation } from "@/src/queries/user";
import { ChangeNameForm } from "@/src/components/settings/personal-info/forms/schema";
import { useRouter } from "expo-router";
import LayoutStatic from "@/src/components/navigation/layouts/LayoutStatic";
import ButtonDefault from "@/src/shared/button/ButtonDefault";
import { useToast } from "@/src/hooks/useToast";
import { TournamentSport } from "@/src/types/tournament";
import FilterItem from "@/src/components/home/filter/FilterItem";

const ChangeNameScreen = () => {
  const { t } = useTranslation();
  const { user } = useUser();
  const formDataMutation = useUpdateUserMutation();
  const router = useRouter();
  const { showSuccessToast } = useToast();

  const [sport, setSport] = useState<TournamentSport[]>(user?.unsafeMetadata.featuredSport || []);

  const sportList: TournamentSport[] = [
    TournamentSport.TABLE_TENNIS,
    TournamentSport.BADMINTON,
    TournamentSport.TENNIS,
    TournamentSport.SQUASH,
  ];

  const handleChooseSport = (item: TournamentSport) => {
    setSport((prev) => {
      if (prev) {
        if (prev.includes(item)) {
          return prev.filter((i) => i !== item);
        }
        return [...prev, item];
      } else {
        return [item];
      }
    });
  };

  const onSubmit = (data: ChangeNameForm) => {
    const formData = clerkTransformData(data, user?.unsafeMetadata || null);
    formDataMutation.mutate(formData, {
      onSuccess: () => {
        showSuccessToast("user_information_updated");
        router.back();
      },
    });
  };

  const updateValues = async () => {
    const formData = clerkTransformData({ featuredSport: sport }, user?.unsafeMetadata || null);
    formDataMutation.mutate(formData, {
      onSuccess: () => {
        showSuccessToast("user_information_updated");
        router.back();
      },
    });
  };

  return (
    <>
      <LayoutStatic name="changeFeaturedSport">
        <View style={styles.wrapper}>
          <View className="flex flex-row flex-wrap gap-4">
            {sportList.map((item, index) => (
              <FilterItem
                key={index}
                label={t(`tournament.sportType.${item}`)}
                isSelected={sport?.includes(item) || false}
                onPress={() => handleChooseSport(item)}
              />
            ))}
          </View>

          <ButtonDefault
            title={t("common.applyChanges")}
            // disabled={!isDirty || Object.keys(formErrors).length > 0}
            onPress={updateValues}
            loading={formDataMutation.isPending}
          />
        </View>
      </LayoutStatic>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    display: "flex",
    alignItems: "center",
    gap: 50,
  },

  buttonWrapper: {
    paddingTop: 10,
    paddingBottom: 120,
    paddingHorizontal: 20,
  },
});

export default ChangeNameScreen;
