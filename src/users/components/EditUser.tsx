import React, { useEffect, useState, ChangeEvent, FormEvent, FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FormContainer, FormTitle, Form, Label, Input, SubmitButton } from '../../components/styledFrom';
import { allUsersFetch, updateUserFetch } from '../redux/usersThunk';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { UsersInterface } from '../../interfaces/UsersInterface';
import { RootState } from '../../Redux/store';
import { PromiseStatus } from '../../interfaces/promiseStatus';

export const EditUser: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { userId } = useParams<{ userId: string }>();
  const id = userId!;

  const status = useAppSelector((state: RootState) => state.users.status);

  useEffect(() => {
    if (status === PromiseStatus.IDLE) {
      dispatch(allUsersFetch());
    }
  }, [dispatch, status]);

  const user = useAppSelector((state: RootState) =>
    state.users.value.find(u => u.id === id)
  );

  const [formData, setFormData] = useState<UsersInterface>({
    Photo: '',
    FullName: '',
    Email: '',
    StartDate: '',
    JobDescription: '',
    Contact: 0,
    status: '',
  });

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  if (status === PromiseStatus.PENDING) {
    return <p>Cargando usuario…</p>;
  }
  if (status === PromiseStatus.FULFILLED && !user) {
    return <p>Usuario con ID {id} no encontrado</p>;
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await dispatch(updateUserFetch({ id, data: formData })).unwrap();
    navigate('/Users');
  };

  return (
    <FormContainer>
      <FormTitle>Edit User</FormTitle>
      <Form onSubmit={handleSubmit}>
        <Label>
          Full Name:
          <Input
            type="text"
            name="FullName"
            value={formData.FullName}
            onChange={handleChange}
          />
        </Label>
        <Label>
          Email:
          <Input
            type="email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
          />
        </Label>
        <Label>
          Start Date:
          <Input
            type="date"
            name="StartDate"
            value={formData.StartDate}
            onChange={handleChange}
          />
        </Label>
        <Label>
          Job Description:
          <Input
            type="text"
            name="JobDescription"
            value={formData.JobDescription}
            onChange={handleChange}
          />
        </Label>
        <Label>
          Contact:
          <Input
            type="text"
            name="Contact"
            value={formData.Contact}
            onChange={handleChange}
          />
        </Label>
        <Label>
          Status:
          <Input
            type="text"
            name="Status"
            value={formData.status}
            onChange={handleChange}
          />
        </Label>
        <SubmitButton type="submit">Save User</SubmitButton>
      </Form>
    </FormContainer>
  );
};

export default EditUser;
