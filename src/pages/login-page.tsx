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
  FormErrorMessage
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { LoginFormInput } from "../interfaces/login-form-input.type";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "../redux-toolkit/hooks";
import { loginThunk } from "../redux-toolkit/auth/auth-thunk";
import { LoginErrorResponse } from "../interfaces/login.type";
import useCustomToast from "../hooks/useCustomToast";
export default function LoginPage() {
  const showToast = useCustomToast();
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  // schema validation
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

  const onSubmit = async(data: LoginFormInput) => {
    try {
      const result = await dispatch(loginThunk(data)).unwrap();
      // console.log(result.access_token);
      if(result.access_token){
        navigate('/dashboard');
      }
      showToast('success', 'เข้าสู่ระบบสำเร็จ');
    } catch (error: any) {
      let err: LoginErrorResponse = error;
      showToast('error', err.message);
    }
    
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
