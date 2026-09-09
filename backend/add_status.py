import os
from sqlalchemy import create_engine, inspect, text
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./test.db")
print(f"🔗 DATABASE_URL = {DATABASE_URL}")

engine = create_engine(DATABASE_URL)

def column_exists(table_name, column_name):
    inspector = inspect(engine)
    columns = [col['name'] for col in inspector.get_columns(table_name)]
    return column_name in columns

def add_status():
    if column_exists("tasks", "status"):
        print("✅ العمود status موجود بالفعل.")
        return
    print("⚠️ جاري إضافة العمود status...")
    with engine.connect() as conn:
        conn.execute(text("ALTER TABLE tasks ADD COLUMN status VARCHAR(50) DEFAULT 'pending'"))
        conn.commit()
        print("✅ تمت إضافة العمود status بنجاح.")

if __name__ == "__main__":
    add_status()
