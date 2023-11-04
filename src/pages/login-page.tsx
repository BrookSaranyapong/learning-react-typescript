import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { LoginFormInput } from "../interfaces/login-form-input.interface";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
export default function LoginPage() {
  const toast = useToast();
  const navigate = useNavigate();
  const schema = yup.object().shape({
    email: yup
      .string()
      .required("ป้อนข้อมูลอีเมล์ด้วย")
      .email("รูปแบบอีเมล์ไม่ถูกต้อง"),
    password: yup
      .string()
      .required("ป้อนข้อมูลรหัสผ่านด้วย")
      .min(3, "รหัสต้องมีอย่างน้อย 3 ตัวอักษรขึ้นไป"),
  });
  const { register, handleSubmit, formState: { errors, isSubmitting },} = useForm<LoginFormInput>({
    resolver: yupResolver(schema),
    mode: "all",
  });
  const onSubmit = (data: LoginFormInput) => {
    // console.log(data);
    toast({
      title: "เข้าสู่ระบบสำเร็จ",
      description: JSON.stringify(data),
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Sign in to your account</Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              to enjoy all of our cool{" "}
              <Text as={"span"} color={"blue.400"}>
                features
              </Text>{" "}
              ✌️
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="email" isInvalid={errors.email ? true : false}>
                <FormLabel>Email address</FormLabel>
                <Input type="email" {...register("email")} />
                <FormErrorMessage>
                  {errors.email && errors.email?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl
                id="password"
                isInvalid={errors.password ? true : false}
              >
                <FormLabel>Password</FormLabel>
                <Input type="password" {...register("password")} />
                <FormErrorMessage>
                  {errors.password && errors.password?.message}
                </FormErrorMessage>
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Text color={"blue.400"}>Forgot password?</Text>
                </Stack>
                <Button
                  type="submit"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  isLoading={isSubmitting}
                  loadingText="กำลังเข้าระบบ..."
                >
                  Login
                </Button>
                <Button
                  bg={"green.400"}
                  color={"white"}
                  _hover={{
                    bg: "green.500",
                  }}
                  onClick={() => {
                    navigate("/", { replace: true });
                  }}
                >
                  กลับหน้าหลัก
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </form>
  );
}
