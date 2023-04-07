import React, { useState } from 'react';
import { ENDPOINT, Todo } from '../App';
import { KeyedMutator } from 'swr';
import { useForm } from '@mantine/form';

import { Button, Group, Modal, TextInput, Textarea } from '@mantine/core';

export default function AddTodo({ mutate }: {mutate: KeyedMutator<Todo[]>}) {

  const [open, setOpen] = useState(false);

  const form = useForm({
    initialValues: {
      title: "",
      body: "",
    },
  });

  async function createTodo(values: {title: string, body: string}) {

    const updated = await fetch(`${ENDPOINT}/api/todos`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values),
    }).then((r) => r.json());

    mutate(updated);
    form.reset();
    setOpen(false); 

  }

  return(
    <>
      <Modal 
        opened={open}
        onClose={() => setOpen(false)}
        title="Create 2do"
      >
        <form onSubmit={form.onSubmit(createTodo)}>
          <TextInput
            required
            mb={12}
            label="2do"
            placeholder='what do u want 2do'
            {...form.getInputProps("title")}
          />
          <Textarea
            required
            mb={12}
            label="Body"
            placeholder='tell me more...'
            {...form.getInputProps("body")}
          />
          <Button 
            type="submit"
          >
            Create 2do
            </Button>
        </form>
      </Modal>  

      <Group
        position="center"
      >
          <Button
            fullWidth
            mb={12}
            onClick={() => setOpen(true)}
          >
            Add 2do
          </Button>
      </Group>
    </>
  );
}