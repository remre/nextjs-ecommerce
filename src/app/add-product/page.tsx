export const metadata = {
  title: "Add-Product",
};

export default function addProductPage() {
  return (
    <div>
      <h1 className="mb- text-xl font-bold"> Add Product</h1>
      <form>
        <input
          className="mb- input input-bordered w-full"
          required
          name="name"
          placeholder="Name"
        />
        <textarea
          required
          name="description"
          placeholder="Description"
          className="textarea textarea-bordered w-full "
        />
        <input
          className="mb- input input-bordered w-full"
          required
          name="ImageUrl"
          placeholder="Image URL"
          type="url"
        />
        <input
          className="mb- input input-bordered w-full"
          required
          name="price"
          placeholder="Price"
          type="numbe"
        />
        <button type="submit" className="btn btn-primary btn-block">
          {" "}
          Add Product
        </button>
      </form>
    </div>
  );
}
