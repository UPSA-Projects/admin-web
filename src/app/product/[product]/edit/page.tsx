"use client";

import React from "react";
import {
  Input,
  Textarea,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import {
  editProductAction,
  getProductByIdAction,
  getTokenDecodedAction,
  getProductCategoryAction,
} from "./_actions/product.edit.action";
import { usePathname } from "next/navigation";

// id: string;
//     userId: string;
//     categoryId: string;
//     name: string;
//     description: string;
//     price: number;
//     stock: number;
//     images: [string];
interface ProductCategory {
  id: string;
  name: string;
  description: string;
}

export default function ProductCreatePage() {
  const path = usePathname();
  const segment = path.split("/");
  const id = segment[2];

  const [categories, setCategories] = React.useState<ProductCategory[]>();
  const [token, setToken] = React.useState<any>("");
  const [name, setName] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [price, setPrice] = React.useState<string>("");
  const [stock, setStock] = React.useState<string>("");
  const [category, setCategory] = React.useState<string>("");

  const handleCreation = async () => {
    const productPrimitive = {
      id: id,
      userId: token.user_id || "dummy-user-id",
      categoryId: category,
      name: name,
      description: description,
      price: parseFloat(price),
      stock: parseInt(stock),
    };
    await editProductAction(productPrimitive);
  };

  const handleGetProductById = async (id: string) => {
    const product = await getProductByIdAction(id);
    return product;
  };

  React.useEffect(() => {
    (async () => {
      const token = await getTokenDecodedAction();
      setToken(token);
      const categories = await getProductCategoryAction();
      setCategories(categories);

      // datos por defecto
      const oldProductValues = await handleGetProductById(id);
      setName(oldProductValues?.name || "");
      setDescription(oldProductValues?.description || "");
      setPrice(oldProductValues?.price.toString() || "");
      setStock(oldProductValues?.stock.toString() || "");
      setCategory(oldProductValues?.categoryId || "");
    })();
  }, [id]);

  return (
    <div className="w-full h-screen overflow-x-hidden border-t flex flex-col px-4 sm:px-8 md:px-16">
      <button
        onClick={() => window.history.back()}
        className="mb-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
      >
        Volver atrás
      </button>
      <Card>
        <CardHeader>
          <h1>Product Create Page</h1>
        </CardHeader>
        <CardBody>
          <Table>
            <TableHeader>
              <TableColumn>FORM</TableColumn>
              <TableColumn>INPUT</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow key="-1">
                <TableCell>Name:</TableCell>
                <TableCell>
                  <Input
                    isClearable
                    label="Name"
                    fullWidth
                    value={name}
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </TableCell>
              </TableRow>
              <TableRow key="2">
                <TableCell>Description:</TableCell>
                <TableCell>
                  <Textarea
                    label="Description"
                    fullWidth
                    value={description}
                    name="description"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </TableCell>
              </TableRow>
              <TableRow key="3">
                <TableCell>Price:</TableCell>
                <TableCell>
                  <Input
                    isClearable
                    label="Price:"
                    fullWidth
                    value={price}
                    name="price"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </TableCell>
              </TableRow>
              <TableRow key="4">
                <TableCell>Stock:</TableCell>
                <TableCell>
                  <Input
                    isClearable
                    label="Stock:"
                    fullWidth
                    value={stock}
                    name="stock"
                    onChange={(e) => setStock(e.target.value)}
                  />
                </TableCell>
              </TableRow>
              <TableRow key="5">
                <TableCell>Category:</TableCell>
                <TableCell>
                  <Dropdown>
                    <DropdownTrigger>
                      <Button variant="bordered">Categoría de productos</Button>
                    </DropdownTrigger>
                    <DropdownMenu items={categories}>
                      {(item) => (
                        <DropdownItem
                          key={item.id}
                          onClick={() => setCategory(item.id)}
                        >
                          {item.name}
                        </DropdownItem>
                      )}
                    </DropdownMenu>
                  </Dropdown>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardBody>
        <CardFooter>
          <Button fullWidth color="primary" onClick={() => handleCreation()}>
            Crear Producto
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
